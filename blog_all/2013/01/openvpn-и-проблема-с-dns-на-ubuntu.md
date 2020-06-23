---
title: "OpenVPN и проблема с DNS на Ubuntu"
tags: "DNS,OpenVPN,ubuntu,Хочу сделать мир лучше"
date: "2013-01-02"
---

В **Ubuntu** сразу не подхватывается **DNS** из **OpenVPN** подключения. Решается следующим образом - в конфигурационный файл '_\*.ovpn_' в конец дописывается:

up /etc/openvpn/update-resolv-conf
down /etc/openvpn/update-resolv-conf

а openvpn запускается со следующими флагами:

openvpn --script-security 2 --config config.ovpn
