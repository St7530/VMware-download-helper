# VMware-download-helper
Solve `Account verification is Pending` issue, force to download VMware softwares on broadcom.com.

## How to use

1. Install [Tampermonkey](https://www.tampermonkey.net/) on your browser.
2. [Click this link](https://github.com/St7530/VMware-download-helper/raw/refs/heads/main/VMware-download-helper-2025-04-01.user.js) to install the script in Tampermonkey.
3. Just normally log in to https://support.broadcom.com/group/ecx/downloads and click the download button as usual. You'll see there is no pop-up restricting you, because the script automatically bypassed it.

## How it works

1. Hook XHR
2. Delete the `exportControlStatus` field in the `/group/ecx/productfiles/-/productFiles/getDownloadableFiles` response

## License

[The MIT License](LICENSE).
