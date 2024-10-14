# Documentation

## APIs
-   [Category](##Category)
-   [Tag](##Tag)

## Category

### Get all categories

```http
  GET /category
```
*Response example*:
```json
[
  {
    "id": "37856e6e-58c0-4995-82b7-c70019d26146",
    "cateName": "sample"
  }
  ...
]
```

### Create category

```http
  POST /category
```

| Body attribute | Type     | Description                     |
| :-------- | :------- | :-------------------------------- |
| `cateName`| `string` | **Required** |

*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "cateName": "sample"
}
```

### Get category

```http
  GET /category${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of category to fetch |

*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "cateName": "sample"
}
```

### Update category

```http
  PATCH /category${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `string` | **Required**. Id of category to update |

| Body attribute | Type     | Description                     |
| :-------- | :------- | :-------------------------------- |
| `cateName`| `string` | **Required**. New name of the selected category|

*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "cateName": "new name"
}
```

### Delete category

```http
  DELETE /category${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `string` | **Required**. Id of category to delete |


*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "cateName": "deleted cate"
}
```

## Tag

### Get all tags

```http
  GET /tag
```

| Query param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`     | `number` | **Default: 1**. Page to view tag pagination |
| `name`     | `string` | Tag name for searching |
| `category`     | `string` | Category string to search for related tag |

*Response example*:
```json
[
  {
    "id": "37856e6e-58c0-4995-82b7-c70019d26146",
    "tagName": "sample tag"
    "category"?: {
      "id": "37856e6e-4dc0-4995-82b7-c70019d26146",
      "cateName": "sample category"
    }
  }
  ...
]
```

### Get tag

```http
  GET /tag/${id}
```

| Param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `string` | **Required**. Selected tag id |

*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "tagName": "sample tag"
  "category"?: {
    "id": "37856e6e-4dc0-4995-82b7-c70019d26146",
    "cateName": "sample category"
  }
}
```

### Create tag

```http
  POST /tag
```

| Body attribute | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tagName`     | `string` | **Required**. Name of the new tag |
| `category`     | `string` | **Required**. The existing category id |

*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "tagName": "sample tag"
}
```

### Update tag

```http
  PATCH /tag/${id}
```


| Param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `string` | **Required**. Selected tag id |

| Body attribute | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tagName`     | `string` | New tag name |
| `category`     | `string` | The existing category id |

*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "tagName": "sample tag"
  "category"?: {
    "id": "37856e6e-4dc0-4995-82b7-c70019d26146",
    "cateName": "sample category"
  }
}
```

### Delete tag

```http
  DELETE /tag/${id}
```


| Param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`     | `string` | **Required**. Selected tag id to delete |


*Response example*:
```json
{
  "id": "37856e6e-58c0-4995-82b7-c70019d26146",
  "tagName": "sample tag"
}
```
