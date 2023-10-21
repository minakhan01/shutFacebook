document.getElementById("set").addEventListener("click", function() {
    const domains = document.getElementById("domains").value.split(',').map(domain => domain.trim());
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
  
    chrome.storage.sync.set({ 
      "domains": domains, 
      "startTime": startTime, 
      "endTime": endTime 
    }, function() {
      console.log('Configuration set.');
    });
  });
  
  chrome.storage.sync.get(["domains", "startTime", "endTime"], function(data) {
    if (data.domains && data.startTime && data.endTime) {
      document.getElementById("domains").value = data.domains.join(', ');
      document.getElementById("startTime").value = data.startTime;
      document.getElementById("endTime").value = data.endTime;
    }
  });
  