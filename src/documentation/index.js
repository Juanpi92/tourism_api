var copyBtn = document.getElementById('copyBtn');

      copyBtn.addEventListener('click', function () {
        var textToCopy = this.getAttribute('data-clipboard-text');

        var input = document.createElement('input');
        input.setAttribute('value', textToCopy);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

          alert('Texto copiado para a área de transferência: ' + textToCopy);
      });

      const showBtn = document.querySelector('.btnShowExemple')
      const showBtn2 = document.querySelector('.btnShowExemple2')
      const showBtn3 = document.querySelector('.btnShowExemple3')
      const showBtn4 = document.querySelector('.btnShowExemple4')
      const showBtn5 = document.querySelector('.btnShowExemple5')
      const jsonCode = document.querySelector('.exemploJson')
      const jsonCode2 = document.querySelector('.exemploJson2')
      const jsonCodePost = document.querySelector('.exemploJsonPost')
      const jsonCodeDelete = document.querySelector('.exemploJsonDelete')
      const jsonCodePut = document.querySelector('.exemploJsonPut')

      showBtn.addEventListener('click', ()=>{
        jsonCode.classList.toggle('showJson')
    
      })
      showBtn2.addEventListener('click', ()=>{
        jsonCode2.classList.toggle('showJson')
    
      })
      showBtn3.addEventListener('click', ()=>{
        jsonCodePost.classList.toggle('showJson')
    
      })
      showBtn4.addEventListener('click', ()=>{
        jsonCodeDelete.classList.toggle('showJson')
    
      })
      showBtn5.addEventListener('click', ()=>{
        jsonCodePut.classList.toggle('showJson')
    
      })