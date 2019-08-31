# Users Routes

## POST /users/register

Cadastra usuarios usando email, senha e cpf

**Exemplo de requisição para admin**

```
{
  "email": "admin@gmail.com",
  "password": "admin",
  "cpf": "12345678919",
  "isAdmin": "true"
}
```

**Exemplo de requisição para usuário comum**

```
{
  "email": "user@gmail.com",
  "password": "user",
  "cpf": "12345678919"
}
```

## POST /users/auth

Faz login do usuário

**Exemplo de requisição**

```
{
  "email": "user@gmail.com",
  "password": "user",
}
```