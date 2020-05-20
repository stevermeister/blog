---
title: I use
description: blog description
published: true
---

*I’m now a Mac user, before it was Ubuntu.*

* [Homebrew](https://brew.sh/)
* [iTerm2](https://www.iterm2.com/) + [ohmyzsh](https://ohmyz.sh/) + [direnv](https://direnv.net/)
* [VSCode Insiders](https://code.visualstudio.com/insiders/) ([settigns](https://gist.github.com/stevermeister/1d78211325ad36d44c88a15dd6a70769))
* vim + sublime
* [Sequel Pro](https://www.sequelpro.com/)
* [1password](https://1password.com/) – password manager
* [VLC player](https://www.videolan.org/)
* Google Chrome
  * 1Password extension
  * Adblock for Youtube
  * Adblock Plus
  * AdBlock
  * Grammarly
  * Mailto: for Gmail
  * Refined GitHub
  * Momentum
* [Calendars](https://apps.apple.com/us/app/calendars)
* [Caffeine](https://apps.apple.com/us/app/caffeine/id411246225)
* [Disk Doctor](https://apps.apple.com/us/app/disk-doctor-clean-your-drive/id455970963)
* ScreenFlow
* [Tunnelblick](https://tunnelblick.net/)
* [PingStatus](https://apps.apple.com/us/app/pingstatus/id1158928913)
* [CopyClip](https://apps.apple.com/us/app/copyclip-clipboard-history/id595191960)
* Spotify / [Radiant Player](https://radiant-player.github.io/radiant-player-mac/) / [SoundCleod](https://soundcleod.com/)
* Dropbox
* Slack / Telegram
* Backup and sync from Google
* [Caps Lock key to switch languages](https://support.apple.com/guide/mac-help/type-language-mac-input-sources-mchlp1406/mac)


sh
```
eval "$(direnv hook zsh)"
alias go="git checkout"
alias code="code-insiders"

function getId(){
	aws ec2 describe-instances --filters Name=tag:Name,Values=$1|jq ".Reservations[].Instances[].InstanceId" --raw-output
}
# $ goe production1
function goe() {
	aws ssm start-session --target $(getId $1)
}
```