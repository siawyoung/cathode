var fs        = require('fs')
var recursive = require('recursive-readdir')
var matter    = require('gray-matter')
var FindFiles = require("node-find-files")
var Canvas    = require('canvas')
var Colibri   = require('./colibri-node')
var rootDir   = "../../"

var postDir   = rootDir + "content"
var imageDir  = rootDir + "static"
var dataDir   = rootDir + "data"

recursive(postDir, function(err, list) {
  var numberOfFiles = list.length
  var toWrite = new Map()
  list.forEach(function(post) {

    fs.readFile(post, "utf-8", function(err, data) {
      var frontMatter = matter(data, { lang: "toml", delims: ["+++", "+++"] })
      var coverName = frontMatter.data.cover
      if (!coverName) { numberOfFiles-- }
      var finder = new FindFiles({
        rootFolder: rootDir + "static",
        filterFunction: function(path, stat) {
          return coverName === path.split('/')[path.split('/').length - 1].split('.')[0]
        }
      })
      finder.on("match", function(path, stat) {

        fs.readFile(path, function(err, data) {
          var img = new Canvas.Image
          img.onload = function() {
            toWrite.set(frontMatter.data.title, Colibri.extractImageColors(img, 'css'))
            if (toWrite.size === numberOfFiles) {
              fs.writeFile(dataDir + "/" + "colours.json", JSON.stringify(strMapToObj(toWrite)))
            }
          }
          img.src = data
        })
      })
      finder.startSearch()
    })
  })
})

function strMapToObj(strMap) {
    var obj = Object.create(null);
    for (var a of strMap) {
        obj[a[0]] = a[1]
    }
    return obj
}