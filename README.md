# Vice City, baby! — GTA 6 in 30 seconds

A vertical Short cut from Rockstar's **Grand Theft Auto VI Trailer 2**, made
by an AI agent for make.fun's bounty
[gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01) — $500 in USDC,
top 20 most-watched clips share it. Places go by YouTube views, most first.

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/JohnyKucel/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/JohnyKucel/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![Node 22](https://img.shields.io/badge/node-22%2B-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## The clip

34 seconds, vertical 1080×1920, cut from the official Trailer 2
([Rockstar Games, YouTube](https://www.youtube.com/watch?v=VQRLujxTm3c)):

- **0:00–0:18 — the hook.** Lucia leaning out of the convertible at golden
  hour ("We got this"), then the club, a street fight, a car exploding, the
  night chase, Jason and Lucia, Ocean Drive and the neon — the trailer's
  fastest 18 seconds, centre-cropped to fill a phone screen.
- **0:18–0:22 — the payoff.** A green jet ski jumping the water, then Jason
  on his bike under a blue sky — the two shots that say Vice City in one
  breath. The slow bar and couch stretch in between was cut out on purpose:
  a Short has no time for it.
- **0:22–0:34 — the pitch.** A full-screen end card, on screen long enough
  to read on a phone: "Make clips like this with AI and earn money on
  make.fun", plus `make.fun/bounty/gta6-clipper-01`. The clip itself is the
  advert for make.fun — that is the point of the bounty.

The trailer's own audio runs under the GTA part and fades out as the pitch
card comes in. No bought views, no bots — the video earns its views or it
doesn't place.

## The video

`VIDEO.json` at the repository root names the video's address on YouTube.
The placeholder below is replaced with the real Short's address once it is
published public on the channel **sandi johan**:

```json
{"url": "https://www.youtube.com/shorts/PLACEHOLDER"}
```

Its description carries, word for word:

> Made by my AI agent for a $500 bounty on make.fun, where you can earn
> money making clips with AI: https://make.fun/bounty/gta6-clipper-01

plus the play code `makefun-cactus-rattan-palm`.

## How the clip was made

All in the recorded build session, with ffmpeg — no editor, no finished
clip downloaded from anywhere:

```sh
# 1. Fetch the official Trailer 2 (1080p)
yt-dlp -f "bv*[height<=1080]+ba/b[height<=1080]" \
  --merge-output-format mp4 -o trailer2.mp4 \
  "https://www.youtube.com/watch?v=VQRLujxTm3c"

# 2. Cut the fast 18 seconds (trailer 1:51–2:09), strip the letterbox,
#    centre-crop to vertical and scale to 1080x1920
ffmpeg -ss 111 -t 18 -i trailer2.mp4 -filter_complex \
  "[0:v]crop=1920:800:0:140,crop=450:800:735:0,scale=1080:1920:flags=lanczos,setsar=1[v];[0:a]anull[aout]" \
  -map "[v]" -map "[aout]" -c:v libx264 -crf 20 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 128k segA1.mp4

# 3. Cut the jet ski + bike finish (trailer 2:20–2:24), audio fading out
ffmpeg -ss 140 -t 4 -i trailer2.mp4 -filter_complex \
  "[0:v]crop=1920:800:0:140,crop=450:800:735:0,scale=1080:1920:flags=lanczos,setsar=1[v];[0:a]afade=t=out:st=2:d=2[aout]" \
  -map "[v]" -map "[aout]" -c:v libx264 -crf 20 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 128k segA2.mp4

# 4. Render the 12-second pitch end card (blurred jet ski frame, darkened,
#    big DejaVu Sans Bold text + the bounty link in gold)
ffmpeg -loop 1 -t 12 -i pitch_bg.jpg -f lavfi -t 12 -i anullsrc=r=48000:cl=stereo \
  -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=30,drawbox=x=0:y=0:w=1080:h=1920:color=black@0.55:t=fill,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Make clips like this':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=720,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='with AI and earn':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=810,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='money on make.fun':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=900,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='make.fun/bounty/gta6-clipper-01':fontsize=46:fontcolor=0xFFD23F:x=(w-text_w)/2:y=1060,setsar=1[v]" \
  -map "[v]" -map 1:a -c:v libx264 -crf 20 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 128k segB.mp4

# 5. Join the three parts into the final 34-second Short
printf "file 'segA1.mp4'\nfile 'segA2.mp4'\nfile 'segB.mp4'\n" > concat.txt
ffmpeg -f concat -safe 0 -i concat.txt -c copy gta6-clipper-01-final.mp4
```

Every frame was watched back before the upload: hook in the first second,
faces and text legible at phone size, pitch readable, 1080×1920, 34 seconds.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`. That is all it does — the video
itself is the entry, and the house reads its views from YouTube. Run it the
way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`. No
network, no clock, no files outside the repository.

## License

MIT — see [LICENSE](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=jy3a6hm3&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
