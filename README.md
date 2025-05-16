# VMware-download-helper
Solve `Account verification is Pending` issue, force to download VMware softwares on broadcom.com.

## How to use

1. Install [Tampermonkey](https://www.tampermonkey.net/) on your browser.
2. [Click this link](https://github.com/St7530/VMware-download-helper/raw/refs/heads/main/VMware-download-helper-2025-04-01.user.js) to install the script in Tampermonkey.
3. Just normally log in to https://support.broadcom.com/group/ecx/downloads and click the download button as usual. You'll see there is no pop-up restricting you, because the script automatically bypassed it.

## How it works

1. Hook XHR
2. Delete the `exportControlStatus` field in the `/group/ecx/productfiles/-/productFiles/getDownloadableFiles` response

## Learn more

- My blog post: [绕过 "Account verification is Pending" 限制，成功在 Broadcom 官网下载 VMware 虚拟机软件 | St7530's Blog](https://st7530.com/2025/04/Bypass-Account-verification-is-Pending-to-download-VMware-softwares-from-Broadcom/)
- My video for modifying response manually using Burp Suite: [卡在 Account verification is Pending？通过抓包改包成功在官网下载 VMware 虚拟机软件！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1ZdoDYdEnC/)
- The key JavaScript code related to this issue: https://support.broadcom.com/o//Downloads-eCX/lib/1.830acc11fee3915e1734.js ([Archived](1.830acc11fee3915e1734.js))

## License

[The MIT License](LICENSE).
