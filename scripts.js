function generateQR() {
    const ssid = document.getElementById('ssid').value;
    const pass = document.getElementById('password').value;
    const encryption = document.getElementById('encryption').value;

    if (ssid.length < 1 || pass.length < 1) {
        alert('Please fill in all fields');
        return;
    }

    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';

    const ssidDisplay = document.createElement('div');
    ssidDisplay.id = 'ssid-display';
    ssidDisplay.textContent = `Network: ${ssid}`;
    qrcodeDiv.appendChild(ssidDisplay);

    let wifiString = `WIFI:S:${ssid};`;  
    if (encryption !== 'nopass') {
        wifiString += `T:${encryption};P:${pass};`;  
    } else {
        wifiString += 'T:nopass;';  
    }
    wifiString += ';';

    new QRCode(qrcodeDiv, {
        text: wifiString,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        const printButton = document.createElement('button');
        printButton.textContent = 'Print QR Code';
        printButton.id = 'print-button';
        printButton.onclick = printQRCode;
        qrcodeDiv.appendChild(printButton);
    }, 100);
}

function printQRCode() {
    const qrCodeDiv = document.getElementById('qrcode');
    const qrImg = qrCodeDiv.querySelector('img');
    const ssidDisplay = document.getElementById('ssid-display');

    if (!qrImg) {
        alert('Please generate QR code first');
        return;
    }

    const printContent = document.createElement('div');
    printContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 24px; margin-bottom: 20px; font-weight: bold;">
                ${ssidDisplay.textContent}
            </div>
            <img src="${qrImg.src}" style="max-width: 400px;">
        </div>
    `;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;

    generateQR();
}
