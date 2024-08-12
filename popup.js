document.getElementById('getDataButton').addEventListener('click', () => {
    console.log('按鈕已被點擊，開始獲取資料'); // 調試用
    // 向當前活躍標籤頁發送消息以觸發抓取資料的過程
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getInfo' }, (response) => {
        if (response) {
          console.log('從內容腳本收到資料:', response); // 調試用
          // 顯示抓取的資料
          document.getElementById('chipValue').textContent = response.chip || '未找到';
          document.getElementById('codeValue').textContent = response.code || '未找到';
          document.getElementById('nameValue').textContent = response.name || '未找到';
          document.getElementById('rabies_brand').textContent = response.rabies_brand || '未找到';
          document.getElementById('rabies_code').textContent = response.rabies_code || '未找到';
          document.getElementById('rabies_date').textContent = response.rabies_date || '未找到';
          document.getElementById('rabies_number').textContent = response.rabies_number || '未找到';
          document.getElementById('rabies_org').textContent = response.rabies_org || '未找到';


        } else {
          console.error('未收到資料，檢查內容腳本是否正常運行'); // 調試用
        }
      });
    });
  });
  
  document.getElementById('fillFormButton').addEventListener('click', () => {
    // 向當前活躍標籤頁發送消息以觸發抓取資料和填寫表單的過程
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startAutoFill' });
    });
  });