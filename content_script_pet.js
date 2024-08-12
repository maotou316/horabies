// content_script_pet.js
// 在B網頁填寫資料
function fillFormO(data) {
  const chipField = document.querySelector('#txtChipID_0');
  // 晶片號碼
  // 疫苗廠牌名稱
  setTimeout(() => {
    const $selBrandElement = $('#S_InjBrandName_0');
    if ($selBrandElement.length) {
      $selBrandElement.val(data.rabies_brand);
      $selBrandElement.trigger('change');
      console.log('111測試斷點'); // ! 測試================================
      chrome.runtime.sendMessage({ action: 'executeSetBatchOpts' });
    }
  }, 100); // 根據需要調整延遲時間
  const targetCityText = '臺中市';
  const selNumElement = document.querySelector('#S_InjOrgCounty_0');
  if (selNumElement) {
    // 遍歷所有選項，找到匹配的文本並設置選擇
    for (let option of selNumElement.options) {
      if (option.text === targetCityText) {
        selNumElement.value = option.value; // 設定選擇的值
        selNumElement.dispatchEvent(new Event('change')); // 觸發更改事件以確保更新生效
        
        
        break; // 找到匹配的選項後退出循環
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


  // 注射機構縣市
  // 注射機構類型
  // 注射機構
  // 狂犬病注射日期
  const rabiesDateField = document.querySelector('#txtINJDATE_0');
  
  // 狂犬病接種牌證號
  const rabiesCode1 = document.querySelector('#txtINJID_year_0');
  const rabiesCode2 = document.querySelector('#txtINJID_2_0');

  // 施打人員
  chipField.value = data.chip;
  rabiesDateField.value = data.rabies_date;
  chipField.focus();
}

// 當接收到消息時執行自動填表
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.action === 'fillForm') {
    window.scrollBy(0, 100);
    fillFormO(message.data);
  }
});


