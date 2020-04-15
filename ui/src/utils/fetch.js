export const get = (url) => fetch(url).then((res) => res.json());

export const getText = (url) => fetch(url).then((res) => res.text());

export const post = (url, content) =>
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  }).then((res) => res.json());
