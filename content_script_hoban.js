// 從當前網頁抓取指定資料
// 從當前網頁抓取指定資料
function getPageInfo() {
    const data = {};
    // 確保正確選擇器並抓取資料
    data.chip = document.querySelector('#chip')?.value || ''; // 晶片號碼
    data.rabies_brand = document.querySelector('#rabies_brand')?.value || '';    // 疫苗廠牌名稱
    data.rabies_number = document.querySelector('#rabies_number')?.value || '';// 疫苗批號
    
    data.rabies_org = document.querySelector('#rabies_org')?.value || ''; // 注射機構
    const date = new Date(); // 取得今天的日期
    data.rabies_date = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;    // 狂犬病注射日期

    data.rabies_code = document.querySelector('#rabies_code')?.value || '';    // 狂犬病接種牌證號
    // 注射機構縣市
    // 注射機構類型
    

 
    // 施打人員


    console.log('抓取到的資料:', data); // 調試用
    return data;
  }
  
  // 接收消息以抓取資料
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getInfo') {
      const data = getPageInfo();
      console.log('收到getInfo消息，返回資料:', data); // 調試用
      sendResponse(data); // 將資料回傳給popup.js
    }
  });
  
  // 在B網頁填寫資料
  function fillFormOnPageB(data) {
    console.log('測試斷3點'); // ! 測試================================
    console.log(data); // ! 測試================================
    const chipField = document.querySelector('#txtChipID_0');
    
    chipField.value = data.chip;
  }
  
  // 當接收到消息時執行自動填表
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startAutoFill') {
      const data = getPageInfo();
      chrome.runtime.sendMessage({
        action: 'openNewWindow',
        url: 'https://www.pet.gov.tw/Admin/B202.aspx',
        data: data
      });
    }
    if (message.action === 'fillForm') {
        console.log('測試斷111點'); // ! 測試================================
    //   fillFormOnPageB(message.data);
    }
  });
  

  