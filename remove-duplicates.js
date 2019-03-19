var removeDuplicates = document.getElementById("remove-duplicates");
var selectAllText = document.getElementById("select-all");
var clearAllText = document.getElementById("clear-all");
var textArea = document.getElementById("duplicate-textarea");
var loadText = document.getElementById("load-text");
var loadFileText = document.getElementById("load-file");
var saveFile = document.getElementById("save-file");
var totalRemovedText = document.getElementById("total-removed");

// Remove Duplicate Lines
removeDuplicates.addEventListener("click", function () {
    var data = textArea.value.split(/\r?\n/);
    var removeEmpty = document.getElementById("remove-empty").checked;
    var caseSensitive = document.getElementById("case-sensitive").checked;
    var totalRemoved = 0;
    var totalEmptyRemoved = 0;

    var seen = {};
    var result = [];
    var len = data.length;
    var j = 0;
    var item;

    if (removeEmpty == false && caseSensitive == false) {
        for(let i = 0; i < len; i++) {
            item = data[i];
            itemCase = item.toUpperCase();
            if (item == "") {
                result[j++] = item;
            } else if (seen[itemCase] != 1) {
                    seen[itemCase] = 1;
                    result[j++] = item;
                }
        }
    };
    
    if (removeEmpty == true) {
    var cleaned = data.filter(n => n);
    len = cleaned.length;
    totalEmptyRemoved = data.length - cleaned.length;
        for(let i = 0; i < len; i++) {
            item = cleaned[i];
            if (seen[item] != 1) {
                seen[item] = 1;
                result[j++] = item;
            }
        }      
    };
    
    if (removeEmpty == false && caseSensitive == true) {
        for(let i = 0; i < len; i++) {
            item = data[i];
            if (item == "") { 
                result[j++] = item;
            } else if (seen[item] != 1) {
                seen[item] = 1;
                result[j++] = item;
            }
        }
    };

    // Write Results
    textArea.value = result.join('\n');

    // Write Output Stats
    if (removeEmpty == true && totalEmptyRemoved > 0) {
        totalRemoved = (data.length - result.length) - totalEmptyRemoved;
        totalRemovedText.innerHTML = "There was a total of <strong>" + totalRemoved + "</strong> duplicates and <strong>" + totalEmptyRemoved + "</strong> empty lines removed.";     
    } else {
        totalRemoved = data.length - result.length; 
        totalRemovedText.innerHTML = "There was a total of <strong>" + totalRemoved + "</strong> duplicates removed.";
    }

});

// Select TextArea Content
selectAllText.addEventListener("click", function () {
    textArea.select();
});

// Clear TextArea
clearAllText.addEventListener("click", function () {
    textArea.value = "";
});

// Loading Text Files
loadText.addEventListener("click", function () {
    loadFileText.click();
});

loadFileText.addEventListener("change", function () {
    var file = loadFileText.files[0];

    if (file.type.match(/text.*/)) {
        var reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = function () {
            textArea.value = reader.result;
        }
        
    } else {
        textArea.value = "File Not Support! Please use a TXT file.";
    }
});

// Save Results
saveFile.addEventListener("click", function () {
    var textToSaveAsBlob = new Blob([textArea.value], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("save-filename").value + ".txt";
    var downloadLink = document.createElement("a");
    
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
