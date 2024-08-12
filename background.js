// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openNewWindow') {
      chrome.windows.create(
        { url: message.url, type: 'popup', width: 1024, height: 700 },
        (newWindow) => {
          // 當新視窗建立後，將資料傳遞給新視窗中的內容腳本
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === newWindow.tabs[0].id && changeInfo.status === 'complete') {
                chrome.tabs.sendMessage(tabId, { action: 'fillForm', data: message.data });
                chrome.tabs.onUpdated.removeListener(listener); // 移除監聽器以防止重複觸發
            }
          });
        }
      );
    }
    
  });
  

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('測試斷點'); // ! 測試================================
    if (message.action === 'executeSetBatchOpts') {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        function: () => {
          if (typeof setBatchOpts === 'function') {
            setBatchOpts(0);
          }
        }
      });
    }
  });
  

// 定義要在頁面中執行的函數
function fillFormInPage(data) {
  console.log(data); // ! 測試================================

  const chipField = document.querySelector('#txtChipID_0');
  const selBrandElement = document.querySelector('#S_InjBrandName_0');
  if (selBrandElement) {
    selBrandElement.value = data.rabies_brand;
    selBrandElement.dispatchEvent(new Event('input'));
    selBrandElement.dispatchEvent(new Event('change'));
    selBrandElement.dispatchEvent(new Event('blur'));

    setTimeout(() => {
      if (typeof setBatchOpts === 'function') {
        setBatchOpts(0); // 根據頁面狀態調用函數
      }
    }, 100);
  }

  const targetCityText = '臺北市';
  const selNumElement = document.querySelector('#S_InjOrgCounty_0');
  if (selNumElement) {
    for (let option of selNumElement.options) {
      if (option.text === targetCityText) {
        selNumElement.value = option.value;
        selNumElement.dispatchEvent(new Event('change'));
        break;
      }
    }
  }

  const selInjOrgTypeElement = document.querySelector('#S_InjOrgType_0');
  if (selInjOrgTypeElement) {
    for (let option of selInjOrgTypeElement.options) {
      if (option.text === '動物醫院') {
        selInjOrgTypeElement.value = option.value;
        selInjOrgTypeElement.dispatchEvent(new Event('change'));
        break;
      }
    }
  }

  const rabiesDateField = document.querySelector('#txtINJDATE_0');
  chipField.value = data.chip;
  rabiesDateField.value = data.rabies_date;
  chipField.focus();
}


