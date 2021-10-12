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

[yaml](./yaml/)

[template](./template/)

```sh
# generate code
node_modules/.bin/fdmd

# generate code with options
node_modules/.bin/fdmd --generate all --inputFile yaml/db.yaml --tempDir template
```

| command options | details                               | remarks                          |
| --------------- | ------------------------------------- | -------------------------------- |
| --generate      | all (default all)                     | auto generate code type          |
| --inputFile     | modeling yaml (default yaml/db.yaml ) | input data to auto generate code |
| --tempDir       | template code (default template)      | input data to auto generate code |

### Support language

| generate code              | support | code example                                |
| -------------------------- | ------- | ------------------------------------------- |
| All                        | ◯       | -                                           |
| Dart - Freezed             | ◯       | [code](./example/fdmd_output/dart_freezed/) |
| Dart                       | -       | -                                           |
| TypeScript                 | -       | -                                           |
| TypeScript - Ballcap-Admin | -       | -                                           |
| Swift                      | -       | -                                           |
| Swift = Ballcap            | -       | -                                           |
| Kotlin                     | -       | -                                           |

## Data Modeling

Can be design data modeling with yaml file.

| type       | support |
| ---------- | ------- |
| string     | ◯       |
| int        | ◯       |
| double     | ◯       |
| timestamp  | ◯       |
| map        | ◯       |
| array      | ◯       |
| any        | ◯       |
| collection | ◯       |
| nullable   | ◯       |

### yaml

[yaml db sample](./yaml/db.yaml)

#### Document

```yaml
docs:
  - name: Poster
    path: /social/${socialId}/posters/${posterId}
    description: 投稿者の情報
    codeGenerate: true
    data:
      - field: id
        type: string
        example: DocumentId
      - field: name
        type: string,nullable
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
maps:
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
          reference: ThumbnailImage # Same maps name
maps:
  - name: ThumbnailImage # Same docs name
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
      - field: posts
        type: collection,Post
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
