/**
 * init module for seajs.org
 */

seajs.config({
  alias: {
    'jquery': 'https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js'
  }
})

define(function(require) {

  var navs = document.getElementById('nav').getElementsByTagName('a')
  var pages = document.getElementsByClassName('page')

  var hash = location.hash.substring(1)
  var pageId = document.getElementById('page-' + hash) ? hash : 'intro'
  var introInited = false

  updateView(pageId)
  bindNavClick()


  // Helpers
  // -------

  function updateView(pageId) {
    setActiveNav(pageId)
    setActivePage(pageId)
  }

  function setActiveNav(pageId) {
    for (var i = 0, len = navs.length; i < len; i++) {
      var link = navs[i]
      var isActive = link.href.slice(-pageId.length) === pageId
      link.className = isActive ? 'active' : ''
    }
  }

  function setActivePage(pageId) {
    for (var i = 0, len = pages.length; i < len; i++) {
      var page = pages[i]
      var isActive = page.id === 'page-' + pageId
      page.className = isActive ? 'page page-active' : 'page'
    }

    if (pageId === 'intro') initIntroPage()
  }

  function bindNavClick() {
    var links = document.getElementsByTagName('a')

    for (var i = 0, len = links.length; i < len; i++) {
      var link = links[i]

      if (isPageNav(link.href)) {
        link.onclick = function() {
          updateView(this.href.replace(/^.*#/, ''))
        }
      }
    }
  }

  function isPageNav(href) {
    if (href.indexOf('#') === -1) return false
    return document.getElementById('page-' + href.replace(/^.*#/, ''))
  }

  function initIntroPage() {
    if (introInited) return

    require.async('./highlight', function(highlight) {
      highlight.init()
    })

    require.async('./github', function(github) {
      document.getElementById('github').style.display = 'block'
      github('seajs/seajs').issues().commits()
    })

    require.async(['jquery', './hello'], function($, hello) {
      $('#beautiful-sea').click(hello.sayHello)
    })

    initCompanyLogos()
    introInited = true
  }

  function initCompanyLogos() {
    var imgs = document.getElementsByClassName('company-logo')[0]
        .getElementsByTagName('img')

    for (var i = 0, len = imgs.length; i < len; i++) {
      var img = imgs[i]
      img.src = img.getAttribute('data-src')
    }
  }

})