function isWithinInterval(currentTime, startTime, endTime) {
    return (currentTime >= startTime) && (currentTime <= endTime);
  }
  
  chrome.storage.sync.get(["domains", "startTime", "endTime"], function(data) {
    if (data.domains && data.startTime && data.endTime) {
      chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        data.domains.forEach(domain => {
          if (tab.url.includes(domain)) {
            const [startHour, startMinute] = data.startTime.split(":").map(Number);
            const [endHour, endMinute] = data.endTime.split(":").map(Number);
            
            const currentDate = new Date();
            const startTime = new Date(currentDate);
            startTime.setHours(startHour);
            startTime.setMinutes(startMinute);
            
            const endTime = new Date(currentDate);
            endTime.setHours(endHour);
            endTime.setMinutes(endMinute);
  
            if (isWithinInterval(currentDate, startTime, endTime)) {
              chrome.tabs.remove(tabId);
            }
          }
        });
      });
    }
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ 
      domains: ["facebook.com"],
      startTime: "21:30", 
      endTime: "08:00" 
    });
  });
  