var transitionSpeed = 500

function wrapParagraphTags() {
  $('.expansion').each(function() {
    var favTracksHeader = $(this).children('h4:contains("Favourite tracks"), h4:contains("Favorite tracks")')
    favTracksHeader.css("margin-top", "30px")
    favTracksHeader.next().addClass("favourite-tracks")
    $(this).children().not('.side-info').wrapAll('<div class="expansion-content" />')
  })
}

function parseSecondaryColors(str) {
  return str.substring(1, str.length - 1).split(" ")
}

$(document).ready(function() {

  wrapParagraphTags()
  var minHeight  = 300

  // reuse as much jquery calls as possible
  var elementsToChange = [$('h1'), $('p:not(".favourite-tracks"), h2'), $('.thumbnail-title, h3, a'), $('.thumbnail-artist, h4'), $('.expansion li'), $('.favourite-tracks')]
  var expansions = $('.expansion')
  var body       = $('body')
  var all        = $.merge([], expansions)
  all            = $($.merge(all, $('.filler')))

  $(expansions).each(function() {
    var self = $(this)
    if (self.height() < minHeight) {
      self.css("height", minHeight)
    }
    self.siblings(".filler").css("height", self.css("height"))
  })

  function changeTypeColors(colors) {
    // cycle through list
    var len = colors.length
    function index(n) { return (n % len) }
    for (var i = elementsToChange.length - 1; i >= 0; i--) {
      elementsToChange[i].css('color', colors[index(i)])
    }
  }

  function resetTypeColors() {
    for (var i = elementsToChange.length - 1; i >= 0; i--) {
      elementsToChange[i].css('color', 'black')
    }
  }

  function changeColours(expansion, color) {
    expansion.css("background-color", color)
    body.css("background-color", color)
  }

  $('.album-thumbnail').click(function() {

    var expansionDiv = $(this).siblings('.expansion')
    var fillerDiv = $(this).siblings('.filler')
    var image = $(this).attr('src')

    // closing an opened div
    if (expansionDiv.is(':visible')) {

      changeColours(expansionDiv, 'white')
      resetTypeColors()

      expansionDiv.slideUp(transitionSpeed)
      fillerDiv.slideUp(transitionSpeed)

    // opening a div
    } else {
      // if the colours are already precomputed
      if (expansionDiv.data("background-color")) {

        var backgroundColor = expansionDiv.data("background-color")
        var secondaryColors = parseSecondaryColors(expansionDiv.data("secondary-colors"))

        changeColours(expansions, backgroundColor)
        changeTypeColors(secondaryColors)

        // slide everything up, then slide the clicked one down
        all.slideUp(transitionSpeed).promise().done(function() {
          expansionDiv.slideDown(transitionSpeed)
          fillerDiv.slideDown(transitionSpeed)
        })

      // if colours are not precomputed, compute them on the fly and cache in data attributes
      } else {
        var img = new Image()
        img.onload = function () {
          var color = Colibri.extractImageColors(img,'css')
          expansionDiv.data("background-color", color.background)
          expansionDiv.data("secondary-colors", JSON.stringify([color.content.join(" ")]).replace(/"/g, ""))

          var backgroundColor = color.background
          var secondaryColors = color.content

          changeColours(expansions, backgroundColor)
          changeTypeColors(secondaryColors)

          all.slideUp(transitionSpeed).promise().done(function() {
           expansionDiv.slideDown(transitionSpeed)
           fillerDiv.slideDown(transitionSpeed)
          })
        }
        img.src = image
      }

    }

  })

})
