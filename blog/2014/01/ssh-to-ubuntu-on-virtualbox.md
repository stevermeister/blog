---
title: "ssh to ubuntu on virtualbox"
tags: "ssh,ubuntu,virtualbox,Хочу сделать мир лучше"
date: "2014-01-08"
---

**Network** tab of **VirtualBox** instance settings, be sure that it is **NAT**.

**Port forwarding**: Host port = 2022(you custom one), guest port 22, name ssh, other left blank.

Install **ssh-server** on ubuntu:

sudo apt-get install openssh-server

Connect:

ssh -p 2022 username@localhost

username - your username within the VM.
