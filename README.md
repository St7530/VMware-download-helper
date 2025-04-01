# VMware-download-helper
Solve `Account verification is Pending` issue, force to download VMware softwares on broadcom.com.

## How to use

1. Install the script in Tampermonkey
2. Just normally log into Broadcom Support Portal and click the download button, you'll see there is no pop-up restricting you.

## How it works

1. Hook XHR
2. Delete the `exportControlStatus` field in the `/group/ecx/productfiles/-/productFiles/getDownloadableFiles` response

## End

The MIT License.
