# Blob 对象

`Blob` 是一个表示不可变、原始数据的类文件对象。

可以按文本、二进制格式进行读取，重要的是可以为别的格式。

## base64 转 blob

```js
const file = dataURLtoFile(item, new Date());this.uploadFile(file);
/**
 * @desc base64转换 blob文件
 * */
const dataURLtoFile(dataUrl) {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const base64Str = atob(arr[1]);
    const n = base64Str.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = base64Str.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
},
/**
 * @desc 上传图片
 * */
const uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    $ajaxPost('/api/work/upload', formData, {
        headers: {
            'content-Type': 'multipart/form-data'
        }
    })
        .then(res => {
            if (res && res.code === 0) {
                this.workData.screenShots.push(res.data.url);
            }
        })
        .catch(err => {
            console.info(err);
        });
},
```

## json 转为 blob

```js
const json = { a: 1, b: 2 };

const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });

// blob 为 {size:22, type:"application/json"}
// await blob.text() 为 '{\n  "a": 1,\n  "b": 2\n}'
```

## 字符串转为 blob 并返回对象的 URL

将一段字符串转为 blob 并生成 URL 下载

```js
const novelData = 'hello world';
const blob = new Blob([novelData], { type: 'text/plain' });
const objectURL = URL.createObjectURL(blob);

const downloadLink = document.createElement('a');
downloadLink.textContent = 'download.txt';
downloadLink.href = objectURL;
downloadLink.download = 'download.txt';

const downloadContainer = document.querySelector('.download');
if (downloadContainer) {
  downloadContainer.appendChild(downloadLink);
}

// Remember to revoke the object URL when it's no longer needed to free memory
downloadLink.addEventListener('click', () => {
  setTimeout(() => URL.revokeObjectURL(objectURL), 100);
});
```

## 从 blob 中提取数据

blob 对象本身不包含数据，它只是保存了数据的引用。要提取 blob 中的数据，需要使用 FileReader 对象。

```js
const reader = new FileReader();

reader.addEventListener('loadend', () => {
  // reader.result 包含 blob 中的数据
});

reader.readAsArrayBuffer(blob);
```

## 从 Response 中读取

```js
const text = await new Response(blob).text();
```

或者：

```js
const text = await blob.text();
// 配合其他 API 如 fetch 使用
```
