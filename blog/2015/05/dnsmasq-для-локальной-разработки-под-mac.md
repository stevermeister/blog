---
title: "Dnsmasq для локальной разработки под Mac"
tags: "DNS,dnsmasq,Хочу сделать мир лучше"
date: "2015-05-09"
---

Так как наш проект использует динамические поддомены, то есть, кроме основного `www.studytube.com`, может быть еще сколько угодно `XXX.studytube.com`. Для локальной среды мы настроили домен `studytube.dev`. Но тут же появился вопрос: как сделать так, чтобы не нужно было каждый раз прописывать в хосты новый поддомен. Wildcard опцию, то есть возможность указать `*.studytube.dev`, к сожалению, `/etc/hosts` не поддерживает.

К счастью, на помощь к нам пришел локальный `DNS`\-сервер **[Dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html)**.

Настройка его очень простая. Все что вам нужно сделать это:

- установить **Dnsmasq**
- настроить **Dnsmasq**, чтобы все запросы `.dev` он отдавал `127.0.0.1`
- настроить **OS X** для отправки всех запросов ```.dev ``в `Dnsmasq`;`` ```

Более подробно можно [тут](http://passingcuriosity.com/2013/dnsmasq-dev-osx/) и на русском [тут](https://kossoff.ru/2014/11/22/%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-dnsmasq-%D0%B4%D0%BB%D1%8F-%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8-%D0%BD%D0%B0-os-x).

На всякий случай, список команд сохраню тут:

\[shell\] brew install dnsmasq cp $(brew list dnsmasq | grep /dnsmasq.conf.example$) /usr/local/etc/dnsmasq.conf sudo cp $(brew list dnsmasq | grep /homebrew.mxcl.dnsmasq.plist$) /Library/LaunchDaemons/ sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist echo "\\naddress=/dev/127.0.0.1" >> /usr/local/etc/dnsmasq.conf sudo launchctl stop homebrew.mxcl.dnsmasq sudo launchctl start homebrew.mxcl.dnsmasq sudo mkdir -p /etc/resolver sudo tee /etc/resolver/dev >/dev/null <<EOF nameserver 127.0.0.1 EOF ping xxx.dev \[/shell\]
