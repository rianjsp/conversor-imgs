function progressBar() { 
        var progressBar = document.getElementById('progressBar')
        var width = 1;
        var interval = setInterval(Frame, 10)

        function Frame() { 
            if (width >= 100) {
                clearInterval(interval)
            } else { 
                width++;
                progressBar.style.width = width + '%';
                
                
            }
    }
    
}

function startProcess() { 
    
     
    const file_ipt = document.getElementById('inputArq');
    const out_ipt = document.getElementById('outArq').value;
    const file = file_ipt.files[0];

    if (!file) { 
        alert('Por favor, selecione uma imagem para realizar a conversão!');
        return; // Sái da função se nenhum arquivo foi selecionado
    }

    // Verifica se o arquivo é uma imagem
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido!');
        return; // Sái da função se não for uma imagem
    }
    
    progressBar()
    const reader = new FileReader();
    reader.onload = (e) => { 
        const img = new Image();
        img.onload = () => { 
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width; // Defina a largura do canvas
            canvas.height = img.height; // Defina a altura do canvas
            ctx.drawImage(img, 0, 0, img.width, img.height); // Inclui a largura e a altura do desenho

            const convertedImg = canvas.toDataURL(`image/${out_ipt}`);

            const d_link = document.createElement('a');
            d_link.className = `linkOut`
            d_link.href = convertedImg;
            // Define a extensão do arquivo de saida com base no tipo de imagem selecionada
            d_link.download = `imagem_convertida.${out_ipt}`; 
            d_link.click();
        }

        img.src = e.target.result;
    }

    reader.readAsDataURL(file);
}
