maj le .env "https://gist.github.com/LeszczyTom/59b1c2ba95dedae868f7922b5834e24b"

lancer ftp
lancer api

Build le serv (build -> artifacts -> build/rebuild)
lancer le node maître: 'icegridnode --Ice.Config=/root/app/Application-Architectures-distribuees/ICE/Server/config.registery'
lancer le node 2: 'icegridnode --Ice.Config=/root/app/Application-Architectures-distribuees/ICE/Server/node2.registery'
lancer icegridadmin: 'icegridadmin --Ice.Config=/root/app/Application-Architectures-distribuees/ICE/Server/config.registery'

server start Server1
server start Server2