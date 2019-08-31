# Github Routes

## [ GET ] - /github

Retorna um `Array` com todos os usuarios do github disponibilizados pelo `ADMIN`

**Exemplo de resposta**
```
[
  {
    "_id": "5d6af3b774f38224383fa71e",
    "login": "tom",
    "name": "Tom Malone",
    "bio": null,
    "location": null,
    "html_url": "https://github.com/tom",
    "createdDate": "2019-08-31T22:24:55.569Z",
    "__v": 0,
    "id": "5d6af3b774f38224383fa71e"
  },
  {
    "_id": "5d6af42174f38224383fa71f",
    "login": "camila",
    "name": "Git projects",
    "bio": null,
    "location": null,
    "html_url": "https://github.com/camila",
    "createdDate": "2019-08-31T22:26:41.388Z",
    "__v": 0,
    "id": "5d6af42174f38224383fa71f"
  }
]
```

## [ GET ] - /github/search

*Rota de ADMIN*

Pesquisa e retorna um usuário do github dado seu `LOGIN`

**Exemplo**

```
/github/search?login=<LOGIN>
```

## [ POST ] - /github/add

*Rota de ADMIN*

Adiciona um usuário do github no banco de dados

**Exemplo de requisição**
```
{
  "login": "tom",
  "name": "Tom Malone",
  "bio": null,
  "location": null,
  "html_url": "https://github.com/tom"
}
```