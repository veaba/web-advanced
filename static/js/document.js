//document.close()
function createDoc(){
	var doc=document.open("text/html","replace");
	var txt="<!DOCTYPE html><html><body>学习 HTML DOM 很有趣!</body></html>";
	doc.write(txt);
	doc.close();
}

// replaceChild()
function replaceChild(){
    var textnode=document.createTextNode("Water");
    var item=document.getElementById("myList").childNodes[0];
    item.replaceChild(textnode,item.childNodes[0]);
}

// appendChild
function appendChild (){
    var node=document.createElement("LI");
    var textnode=document.createTextNode("Water");
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
}

// insertBefore

function insertBefore(){
    var a=document.createElement('a');
    a.href='sb';
    a.textContent='sbsbsbbs'
    var sping= document.querySelector('li:nth-child(4)')
    document.querySelector('ul').insertBefore(a,sping)
}