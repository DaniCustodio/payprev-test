# Folders Routes

## [ POST ] - /folders

Retorna um Array com todas as pastas de um determinado usuário dado sua ID

**Exemplo de requisição**

```
{
  "idUser": "5d683c0de41d5109f4944432"
}
```

**Exemplo de resposta**

```
[
  {
    "items": [],
    "_id": "5d6afa5d74f38224383fa720",
    "name": "new folder",
    "user": "5d683c0de41d5109f4944432",
    "createdDate": "2019-08-31T22:53:17.216Z",
    "__v": 0,
    "id": "5d6afa5d74f38224383fa720"
  },
  {
    "items": [],
    "_id": "5d6afa9e74f38224383fa721",
    "name": "folder",
    "user": "5d683c0de41d5109f4944432",
    "createdDate": "2019-08-31T22:54:22.019Z",
    "__v": 0,
    "id": "5d6afa9e74f38224383fa721"
  }
]
```

## [ POST ] - /folders/create

Cria uma pasta no banco de dados, dados nome da pasta e ID do usuário a que pertence

**Exemplo de requisição**
```
{
  "name": "folder",
  "user": "5d683c0de41d5109f4944432"
}
```

## [ POST ] - /folders/update

Edita uma pasta dado sua ID e objeto com seu novo nome

**Exemplo de requisição**
```
{
  "id": "5d6941976c6dd23300d3ac44",
  "folder": {"name": "full stack"}
}
```

## [ POST ] - /folders/additem

Adiciona um usuário do github, existente no banco de dados, em uma pasta dados ID da pasta e do usuário github

**Exemplo de requisição**

```
{
  "idFolder": "5d6941976c6dd23300d3ac44",
  "idUserGithub": "5d68fec7c1c5b72b28ac807e"
}
```

## [ POST ] - /folders/removeitem

Remove um usuário github existente de uma pasta dados ID da pasta e do usuário github

**Exemplo de requisição**

```
{
  "idFolder": "5d6941976c6dd23300d3ac44",
  "idUserGithub": "5d68fec7c1c5b72b28ac807e"
}
```