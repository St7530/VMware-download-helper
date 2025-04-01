// ==UserScript==
// @name         VMware-download-helper
// @namespace    http://tampermonkey.net/
// @version      2025-04-01
// @description  Solve `Account verification is Pending` issue, force to download VMware softwares on broadcom.com.
// @author       St7530
// @match        https://support.broadcom.com/group/ecx/productfiles*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=broadcom.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const originalXHR = window.XMLHttpRequest;
    const originalOpen = originalXHR.prototype.open;
    const originalSend = originalXHR.prototype.send;

    // 深度删除工具函数
    function deepRemoveKey(obj, targetKey) {
        const paths = [];
        function traverse(o, path = []) {
            if (Array.isArray(o)) {
                o.forEach((item, index) => {
                    traverse(item, [...path, `[${index}]`]);
                });
            } else if (typeof o === 'object' && o !== null) {
                Object.entries(o).forEach(([key, value]) => {
                    const currentPath = [...path, key];
                    if (key === targetKey) {
                        delete o[key];
                        paths.push(currentPath.join('.'));
                    }
                    traverse(value, currentPath);
                });
            }
        }
        traverse(obj);
        return paths;
    }

    originalXHR.prototype.open = function(method, url) {
        this._url = url;
        return originalOpen.apply(this, arguments);
    };

    originalXHR.prototype.send = function(body) {
        const xhr = this;
        const originalOnReadyStateChange = xhr.onreadystatechange;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    const responseUrl = xhr._url || '未知URL';
                    const originalResponse = JSON.parse(xhr.responseText);

                    console.groupCollapsed(`[脚本日志] 请求响应 ${responseUrl}`);
                    console.log('%c原始响应内容', 'color: #4285f4; font-weight: bold', JSON.parse(JSON.stringify(originalResponse)));

                    // 深度删除操作
                    const deletedPaths = deepRemoveKey(originalResponse, 'exportControlStatus');

                    if (deletedPaths.length > 0) {
                        Object.defineProperty(xhr, 'responseText', {
                            value: JSON.stringify(originalResponse),
                            writable: false
                        });

                        console.log('%c已删除以下字段：', 'color: #0f9d58; font-weight: bold', {
                            count: deletedPaths.length,
                            paths: deletedPaths,
                            modifiedResponse: JSON.parse(JSON.stringify(originalResponse))
                        });
                    } else {
                        console.log('%c未找到目标字段', 'color: #db4437; font-weight: bold');
                    }

                    console.groupEnd();
                } catch (e) {
                    console.warn('[脚本异常] 处理失败:', e);
                }
            }
            originalOnReadyStateChange && originalOnReadyStateChange.apply(xhr, arguments);
        };

        return originalSend.call(xhr, body);
    };
})();