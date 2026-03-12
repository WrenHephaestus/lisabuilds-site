#!/usr/bin/env python3
"""
Lisa's Twitter posting tool.

Usage:
    # Post a single tweet
    python post.py "Your tweet text here"

    # Post a thread (tweets separated by ---)
    python post.py --thread thread_file.md

    # Post next queued tweet
    python post.py --next

    # Dry run (shows what would post without posting)
    python post.py --dry-run "Test tweet"
    python post.py --dry-run --next
"""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path

import tweepy
from dotenv import load_dotenv

# Load .env from the twitter directory
SCRIPT_DIR = Path(__file__).parent
load_dotenv(SCRIPT_DIR / ".env")

# Paths
QUEUE_DIR = SCRIPT_DIR / "queue"
POSTED_DIR = SCRIPT_DIR / "posted"
LOG_FILE = SCRIPT_DIR / "post_log.json"


def get_client():
    """Authenticate and return a tweepy Client (v2 API)."""
    api_key = os.getenv("TWITTER_API_KEY")
    api_secret = os.getenv("TWITTER_API_SECRET")
    access_token = os.getenv("TWITTER_ACCESS_TOKEN")
    access_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

    missing = []
    if not api_key:
        missing.append("TWITTER_API_KEY")
    if not api_secret:
        missing.append("TWITTER_API_SECRET")
    if not access_token:
        missing.append("TWITTER_ACCESS_TOKEN")
    if not access_secret:
        missing.append("TWITTER_ACCESS_TOKEN_SECRET")

    if missing:
        print(f"Error: Missing credentials: {', '.join(missing)}")
        print(f"Set them in {SCRIPT_DIR / '.env'}")
        sys.exit(1)

    return tweepy.Client(
        consumer_key=api_key,
        consumer_secret=api_secret,
        access_token=access_token,
        access_token_secret=access_secret,
    )


def log_post(tweet_text, tweet_id, source="manual"):
    """Append to post log."""
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)

    log = []
    if LOG_FILE.exists():
        log = json.loads(LOG_FILE.read_text())

    log.append({
        "timestamp": datetime.now().isoformat(),
        "tweet_id": str(tweet_id),
        "text": tweet_text[:100] + ("..." if len(tweet_text) > 100 else ""),
        "source": source,
    })

    LOG_FILE.write_text(json.dumps(log, indent=2))


def post_tweet(text, dry_run=False, source="manual"):
    """Post a single tweet. Returns the tweet ID."""
    if len(text) > 280:
        print(f"Warning: Tweet is {len(text)} chars (max 280)")
        print(f"Text: {text[:280]}...")
        print("Truncating is not allowed. Please shorten the tweet.")
        sys.exit(1)

    if dry_run:
        print(f"[DRY RUN] Would post ({len(text)} chars):")
        print(f"  {text}")
        return "dry-run-id"

    client = get_client()
    response = client.create_tweet(text=text)
    tweet_id = response.data["id"]

    print(f"Posted! Tweet ID: {tweet_id}")
    print(f"  https://x.com/i/status/{tweet_id}")

    log_post(text, tweet_id, source)
    return tweet_id


def post_thread(tweets, dry_run=False, source="manual"):
    """Post a thread (list of tweet texts). Each replies to the previous."""
    if dry_run:
        print(f"[DRY RUN] Would post thread ({len(tweets)} tweets):")
        for i, tweet in enumerate(tweets, 1):
            print(f"  [{i}/{len(tweets)}] ({len(tweet)} chars) {tweet[:80]}...")
        return

    client = get_client()
    previous_id = None

    for i, tweet in enumerate(tweets, 1):
        if len(tweet) > 280:
            print(f"Error: Tweet {i} is {len(tweet)} chars (max 280). Aborting thread.")
            sys.exit(1)

        if previous_id:
            response = client.create_tweet(text=tweet, in_reply_to_tweet_id=previous_id)
        else:
            response = client.create_tweet(text=tweet)

        previous_id = response.data["id"]
        print(f"  [{i}/{len(tweets)}] Posted: https://x.com/i/status/{previous_id}")
        log_post(tweet, previous_id, source)

    print(f"Thread complete! {len(tweets)} tweets posted.")


def load_thread_file(filepath):
    """Load a thread file. Tweets separated by --- on its own line."""
    text = Path(filepath).read_text().strip()
    tweets = [t.strip() for t in text.split("\n---\n") if t.strip()]
    return tweets


def get_next_queued():
    """Get the next file from the queue (sorted by filename)."""
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(QUEUE_DIR.glob("*.md"))
    if not files:
        files = sorted(QUEUE_DIR.glob("*.txt"))
    if not files:
        return None, None

    return files[0], files[0].read_text().strip()


def mark_posted(queue_file):
    """Move a queue file to the posted directory."""
    POSTED_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    dest = POSTED_DIR / f"{timestamp}_{queue_file.name}"
    queue_file.rename(dest)
    print(f"  Moved to: {dest}")


def post_next(dry_run=False):
    """Post the next tweet from the queue."""
    queue_file, content = get_next_queued()

    if not queue_file:
        print("Queue is empty. Nothing to post.")
        return

    print(f"Next in queue: {queue_file.name}")

    # Check if it's a thread (contains ---)
    if "\n---\n" in content:
        tweets = [t.strip() for t in content.split("\n---\n") if t.strip()]
        post_thread(tweets, dry_run=dry_run, source=f"queue:{queue_file.name}")
    else:
        post_tweet(content, dry_run=dry_run, source=f"queue:{queue_file.name}")

    if not dry_run:
        mark_posted(queue_file)


def main():
    parser = argparse.ArgumentParser(description="Lisa's Twitter posting tool")
    parser.add_argument("text", nargs="?", help="Tweet text to post")
    parser.add_argument("--thread", metavar="FILE", help="Post a thread from a file (tweets separated by ---)")
    parser.add_argument("--next", action="store_true", help="Post the next tweet from the queue")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be posted without posting")

    args = parser.parse_args()

    if args.next:
        post_next(dry_run=args.dry_run)
    elif args.thread:
        tweets = load_thread_file(args.thread)
        post_thread(tweets, dry_run=args.dry_run, source=f"file:{args.thread}")
    elif args.text:
        post_tweet(args.text, dry_run=args.dry_run)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
