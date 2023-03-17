# Project 3. Base authentication NextJS using TypeScript, FluentUI v9

Sinh viên: Phan Minh Hoàng\
MSSV: 20173136\
Lớp: KTMT.06-K62

Giảng viên hướng dẫn: ThS. Nguyễn Đức Tiến

# Cấu trúc ứng dụng:

- src: Thư mục gốc

* component: Khai báo các component sử dụng trong app
* api-client: Base axios (call api)
* constaint: Khai báo các biến constaint sử dụng trong app
* context: Chứa các context sử dụng trong app (AuthProvider, ProtectRoute).
* hooks: Khai báo các hooks sử dụng trong app
* models: Models props, khai báo kiểu dữ liệu
* pages: UI app:

- api: proxy api Nextjs.
  VD: API REGISTER /api/register.ts
- \_app.tsx: File gốc sử dụng để chạy app. Cấu trúc component gốc được đặt trong file này
  \_document.tsx: Lưu trữ tất cả các CSS được tạo ra bởi Emotion vào trong cache và sử dụng lại chúng cho các request tiếp theo giúp giảm thiểu thời gian render và tối ưu hóa hiệu suất của ứng dụng.
- Other folders (users, accounts, ...) các page modules trong app

* routes: Khai báo router, sử dụng cho Navigation Menu
* styles: Global CSS , config tailwind CSS, reset.css
* theme: Khai báo theme FluentUI (global).

- data: Folder chứa dữ liệu người dùng được lưu vào các file .json
- helpers/api: Backend logic xử lí các request, response từ client

## Sử dụng trong project:

- Quản lí package: [Yarn](https://classic.yarnpkg.com/)
- Technologies:
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [FluentUI v9](https://react.fluentui.dev/)
  - [Axios](https://axios-http.com/vi/docs/intro)
  - [Rxjs](https://rxjs.dev/)
  - Form controler: Formik, Yup, ...
  - [React](https://react.dev/)

### Clone project sử dụng HTTPS và khởi động project

Clone project:

```

git clone https://github.com/hoang120899/project3.git

```

Tải xuống tất cả packages cần thiết sử dụng trong project này

```

cd project3

yarn

```

Build app:

```
cd project3

yarn build

// các file build ra sẽ được tìm thấy trong folder .next

```

Start app:

```
yarn start

```

Using development

```
cd project3

yarn dev
```

### `yarn dev`

Chạy app ở mode development.\
Mở [http://localhost:3000](http://localhost:3000) để xem trang web trên trình duyệt.\

Trang web sẽ được reload nếu có chỉnh sửa code\
Có thể nhìn thấy các lỗi từ lint trong console.

### `yarn build`

Build production:

- production: `yarn build`

### `yarn start`

Chạy app ở producion mode.\
Mở [http://localhost:3000](http://localhost:3000) để xem trang web trên trình duyệt.\
Trang web sẽ không tự thay đổi nếu chỉnh sửa code\
Có thể nhìn thấy các lỗi từ lint trong console.

## I. Config VsCode Editor

Cài đặt thêm các extension dưới để follow các convension cơ bản phía trên:

- ESlint (dbaeumer.vscode-eslint)
- EditorConfig for VS Code (editorconfig.editorconfig)
- Prettier - Code formatter (esbenp.prettier-vscode)

Các setting cần thiết cho VsCode đã được thêm vào project, không tùy chỉnh lại.

## II. Convention code:

### 1. Căn lề

- Kiểu: space
- Size: 2

### 2. Đặt tên

- Đặt tên **biến** theo định dạng **camelCase**
- Đặt tên **hàm** theo định dạng **camelCase**
- Đặt tên **class** theo định dạng **PascalCase**

### 3. Khai báo component

- Đặt tên **component** theo định dạng **PascalCase**
- Nên dùng **FunctionComponent** nếu có thể
- **Mỗi file một component**, tên file giống tên component
- Nếu là một component bao gồm nhiều thành phần, cần khai báo thành một thư mục theo các yêu cầu dưới:
  - Tên thư mục giống tên component

### 4. Khai báo module page

- Các module mới phải được khai báo trong **src/pages**
- Đặt tên **module** theo định dạng **camelCase**
- Khuyên dùng **FunctionComponent**
- Cấu trúc mỗi module sẽ có dạng:
  - moduleName\
    -- index.tsx (/moduleName)\
    -- [param].tsx (/moduleName/param={...})\
    -- [...slug].tsx (/moduleName/"something else")\
    -- childModule (/moduleName/childModule )

### 5. JSX

- Props

  - Nếu một thẻ có nhiều props hoặc prop quá dài, cần phân prop xuống thành nhiều dòng. VD:

  ```jsx
  <Field
    component={CheckboxGroupField}
    options={[
      {
        value: "1",
        label: "ABC",
      },
      {
        value: "aabc",
        label: "ABCD",
      },
      {
        value: "abec",
        label: "ABC 1",
      },
    ]}
    name="abc"
    type="abctype"
    circle
  />
  ```

- Children
  - Nếu không có thẻ con bên trong cần sử dung selft closing tag. VD: `<Image />`
  - Các thẻ con bên trong cần được thêm 1 indent so với thẻ cha. VD:
  ```jsx
  <View>
    <Text>just a text</Text>
  </View>
  ```

## Call API với axios:

- Import `_getApi, _postApi, _putApi, _deleteApi` từ `src/api-client`
- Tham số đầu vào của `_getApi, _postApi, _putApi, _deleteApi` là một danh danh sách các giá trị như
  - url
  - data
  - config
- Handle resolve, reject trong try-catch để bắt lỗi.

VD:

```ts
try {
  const res = await _postApi(API_SIGNIN, payload);

  const data = await res.data;
} catch (error) {
  // handle error
}
```

## Sử dụng useAuth để lấy thông tin người dùng:

- Import { useAuth } from "src/context";

- useAuth cung cấp các giá trị trả về như sau:
  - isAuthenticated: Người dùng đã được xác thực hay chưa.
  - login(): hàm đăng nhập.
  - logout(): hàm đăng xuất
  - user: Thông tin user
  - loading: trạng thái loading (boolean)
  - handleUpdateUser(value: User): hàm cập nhật thông tin user

VD:

```ts
import { useAuth } from "src/context";

const { handleUpdateUser, isAuthenticated, loading, login, logout, user } =
  useAuth();
```

## Tài liệu tham khảo:

- NextJS: https://nextjs.org/
- Axios: https://axios-http.com/vi/docs/intro
- Fluent UI: https://react.fluentui.dev/
- cùng với các nguồn từ Github, stackoverflow,...
