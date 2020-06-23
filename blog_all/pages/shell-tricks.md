---
title: shell tricks
description: blog description
tags: "shell"
date: "2013-01-02"
---

# shell tricks

```
# change DNS
vim /etc/resolv.conf

# check open ports
netstat -tnlp

# look for file by text
grep -rl ‘sometext’ /path

# generate random file with specific size
dd if=/dev/urandom bs=1M count=300 of=./testfile

# count lines of code (in git project)
git ls-files | xargs wc -l

# count lines of code by specific extention
find . -name '*.js' | xargs wc -l

# cut file with ffmpeg
ffmpeg -i ./file.avi -acodec copy -vcodec copy -ss 00:00:00 -t 00:02:13 ./new_file.avi

# copy file with scp
# download: remote -> local
scp user@remote_host:remote_file local_file
# upload: local -> remote
scp local_file user@remote_host:remote_file

# flush MySQL root password
sudo /etc/init.d/mysql stop
sudo mysqld --skip-grant-tables
mysql -u root mysql
UPDATE user SET Password=PASSWORD('YOURNEWPASSWORD') WHERE User='root'; FLUSH PRIVILEGES; exit;
```