# Firestore Data Modeling

Firestore 設計 => コード自動生成のサンプル yaml

## 🗂 Domains

| Name       | Description          | Path          |
| ---------- | -------------------- | ------------- |
| Social     | ソーシャル機能を管理 | `/social`     |
| Master     | マスター管理         | `/master`     |
| AppService | アプリシステムの状態 | `/appService` |

## 🗂 Docs

| Name        | Description      | Path                                                                      |
| ----------- | ---------------- | ------------------------------------------------------------------------- |
| Poster      | 投稿者の情報     | `/social/${socialId}/posters/${posterId}`                                 |
| Post        | 投稿情報         | `/social/${socialId}/posters/${posterId}/posts/${postId}`                 |
| Like        | いいね           | `/social/${socialId}/posters/${posterId}/posts/${postId}/likes/${likeId}` |
| Color       | カラー情報       | `/master/${masterId}/colors/${colorId}`                                   |
| Maintenance | メンテナンス情報 | `/appService/${appServiceId}/maintenance/${maintenanceId}`                |

### ✅ Social

#### 📒 Poster

投稿者の情報

##### Document path

```
/social/${socialId}/posters/${posterId}
```

##### Data field

| Name      | Type                        | Example                     |
| --------- | --------------------------- | --------------------------- |
| id        | string                      | `DocumentId`                |
| name      | string,nullable             | `ケン`                      |
| age       | int,nullable                |                             |
| image     | map,nullable,ThumbnailImage |                             |
| createdAt | timestamp,nullable          | `2021-09-16T13:10:52+09:00` |
| updatedAt | timestamp,nullable          | `2021-09-16T13:10:52+09:00` |

##### SubCollection

| CollectionName | Type | Example  |
| -------------- | ---- | -------- |
| posts          | Post | 投稿情報 |

#### 📒 Post

投稿情報

##### Document path

```
/social/${socialId}/posters/${posterId}/posts/${postId}
```

##### Data field

| Name       | Type               | Example                     |
| ---------- | ------------------ | --------------------------- |
| title      | string,nullable    | `タイトル`                  |
| text       | string,nullable    | `テキスト内容`              |
| likeCount  | int,nullable       | `10`                        |
| stars      | double,nullable    | `4.5`                       |
| isBookmark | bool,nullable      | `true`                      |
| createdAt  | timestamp,nullable | `2021-09-16T13:10:52+09:00` |
| updatedAt  | timestamp,nullable | `2021-09-16T13:10:52+09:00` |

##### SubCollection

| CollectionName | Type | Example |
| -------------- | ---- | ------- |
| likes          | Like | いいね  |

#### 📒 Like

いいね

##### Document path

```
/social/${socialId}/posters/${posterId}/posts/${postId}/likes/${likeId}
```

##### Data field

| Name      | Type                        | Example                     |
| --------- | --------------------------- | --------------------------- |
| id        | string                      | `DocumentId`                |
| name      | string,nullable             | `ケン`                      |
| age       | int,nullable                |                             |
| image     | map,nullable,ThumbnailImage |                             |
| createdAt | timestamp,nullable          | `2021-09-16T13:10:52+09:00` |
| updatedAt | timestamp,nullable          | `2021-09-16T13:10:52+09:00` |

※ dataReference: Poster

### ✅ Master

#### 📒 Color

カラー情報

##### Document path

```
/master/${masterId}/colors/${colorId}
```

##### Data field

| Name  | Type                  | Example                |
| ----- | --------------------- | ---------------------- |
| codes | string,array,nullable | `['000000', 'FFFFFF']` |

### ✅ AppService

#### 📒 Maintenance

メンテナンス情報

##### Document path

```
/appService/${appServiceId}/maintenance/${maintenanceId}
```

##### Data field

| Name      | Type               | Example                     |
| --------- | ------------------ | --------------------------- |
| status    | string             | `active`                    |
| createdAt | timestamp,nullable | `2021-09-16T13:10:52+09:00` |
| updatedAt | timestamp,nullable | `2021-09-16T13:10:52+09:00` |

## 🗂 Maps

| Name           | Description |
| -------------- | ----------- |
| ThumbnailImage | 画像情報    |

### 📒 ThumbnailImage

画像情報

##### Data field

| Name | Type   | Example                                                 |
| ---- | ------ | ------------------------------------------------------- |
| url  | string | `https://sample/image.jpg`                              |
| path | string | `/social/${socialId}/users/${userId}/images/${imageId}` |
