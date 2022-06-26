SEA = Gun.SEA;
const gun = GUN(['http://localhost:8080/gun']);
gun.get('domains').get('test.badclup').get('ipv4').once(console.log);