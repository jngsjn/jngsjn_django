(() => {
  const stepElements = document.querySelectorAll('.step')
  const graphicElements = document.querySelectorAll('.graphic-item')
  let currentItem = graphicElements[0] //현재 활성화된 .graphic-item 지정
  let ioIndex

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1 //*1하면 숫자로 바뀜
  })
  
  for (let i = 0; i < stepElements.length; i++) {
    io.observe(stepElements[i]) //시점마다 체크
    // stepElements[i].setAttribute('data-index', i)
    stepElements[i].dataset.index = i
    graphicElements[i].dataset.index = i
  }

  function activate(action) {
    currentItem.classList.add('visible')
    if (action){
      actions[action](true)
    }
  }
  function inactivate(action) {
    currentItem.classList.remove('visible')
    if (action){
      actions[action](false)
    }
  }

  window.addEventListener('scroll', () => {
    let step
    let boundingRect

    //for (let i = 0; i<stepElements.length; i++)
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElements[i]
      if (!step) continue
      boundingRect = step.getBoundingClientRect()

      if (boundingRect.top > window.innerHeight * 0.1 && 
          boundingRect.top < window.innerHeight * 0.8) {
          inactivate()
          currentItem = graphicElements[step.dataset.index]
          activate(currentItem.dataset.action)
      }
    }
  })
  activate()
})()
//구간에 진입하면 이미지 파일 변환