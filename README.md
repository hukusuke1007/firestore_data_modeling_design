# fdmd

Firebase Data Modeling Desing Tool. yaml => firestore modeling code.

https://www.npmjs.com/package/fdmd

## Install

Install to your project (recommand).

```sh
npm install --save-dev fdmd
```

## Run

Copy from yaml dir and template dir to your current directory.

[yaml](./yaml/)<br>
[template](./template/)

```sh
# generate code
node_modules/.bin/fdmd

# generate code with options
node_modules/.bin/fdmd --generate all --inputFile yaml/db.yaml --tempDir template
```

| command options | details                                 | remarks                          |
| --------------- | --------------------------------------- | -------------------------------- |
| --generate      | all (default `all`)                     | auto generate code type          |
| --inputFile     | modeling yaml (default `yaml/db.yaml` ) | input data to auto generate code |
| --tempDir       | template code (default `template`)      | input data to auto generate code |

### Support language

| generate code              | support | command          | generate code example                           |
| -------------------------- | ------- | ---------------- | ----------------------------------------------- |
| All                        | ◯       | all              | [code](./example/fdmd_output/)                  |
| Dart                       | -       | -                | -                                               |
| Dart - Freezed             | ◯       | dart_freezed     | [code](./example/fdmd_output/dart_freezed/)     |
| TypeScript                 | -       | -                | -                                               |
| TypeScript - Ballcap-Admin | ◯       | ts_ballcap_admin | [code](./example/fdmd_output/ts_ballcap_admin/) |
| Swift                      | -       | -                | -                                               |
| Swift - Ballcap            | -       | -                | -                                               |
| Kotlin                     | -       | -                | -                                               |

## Data Modeling

Can be design data modeling with yaml file.

| type      | support |
| --------- | ------- |
| string    | ◯       |
| int       | ◯       |
| double    | ◯       |
| timestamp | ◯       |
| map       | ◯       |
| array     | ◯       |
| any       | ◯       |
| bool      | ◯       |
| nullable  | ◯       |

### How to design yaml

[yaml sample](./yaml/db.yaml)

#### Document

```yaml
docs: # add
  - name: Poster
    path: /social/${socialId}/posters/${posterId}
    description: 投稿者の情報
    codeGenerate: true # code generate
    data:
      - field: id
        type: string # non nullable
        example: DocumentId
      - field: name
        type: string,nullable # nullable
        example: ケン
      - field: age
        type: int,nullable
        example: 10
      - field: createdAt
        type: timestamp,nullable
        example: '2021-09-16T13:10:52+09:00'
      - field: updatedAt
        type: timestamp,nullable
        example: '2021-09-16T13:10:52+09:00'
```

Map model

```yaml
maps: # add
  - name: ThumbnailImage
    description: 画像情報
    codeGenerate: true
    data:
      - field: url
        type: string
        example: https://sample/image.jpg
      - field: path
        type: string
        example: /social/${socialId}/users/${userId}/images/${imageId}
```

Reference map model

```yaml
docs:
  - name: Poster
    path: /social/${socialId}/posters/${posterId}
    description: 投稿者の情報
    codeGenerate: true
    data:
      - field: image
        type: map,nullable
        map:
          reference: ThumbnailImage # add. same maps name
maps:
  - name: ThumbnailImage # add. same docs name
    description: 画像情報
    codeGenerate: true
    data:
      - field: url
        type: string
        example: https://sample/image.jpg
      - field: path
        type: string
        example: /social/${socialId}/users/${userId}/images/${imageId}
```

#### Collection

```yaml
docs:
  - name: Poster
    path: /social/${socialId}/posters/${posterId}
    description: 投稿者の情報
    codeGenerate: true
    data:
      - field: name
        type: string,nullable
        example: ケン
    collections: # add
      - field: posts
        type: Post
  - name: Post
    path: /social/${socialId}/posters/${posterId}/posts/${postId}
    description: 投稿情報
    codeGenerate: true
    data:
      - field: title
        type: string,nullable
        example: タイトル
      - field: text
        type: string,nullable
        example: テキスト内容
```
