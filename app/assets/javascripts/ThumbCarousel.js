var ThumbCarousel = (function() {
  var max_thumbs = 8,
      $container;


  function Controller(config) {
    this.url = config.url;
    this.node = config.node;
    this.thumbs = [];
  }

  Controller.prototype = {
    init: function() {
      var this_obj = this;

      this._loadSpinner();
      this._getData();


      $(this.node).on('mouseout', function() {
        for (var i = 0; i < this_obj.thumbs.length; i++) {
          this_obj.thumbs[i].resetDamp();
        }
      });
    },

    _loadSpinner: function() {
      this.node.innerHTML = "Loading featured articles...";
    },

    _getData: function() {
      var this_obj = this;

      $.ajax({
        url: this_obj.url,
      })
        .done(function(data) {
          this_obj.data = data;
          this_obj._hideSpinner();
          this_obj._build(data);
        });
    }, 

    _build: function(data) {
      var i,
          thumb,
          num = Math.min(data.length, 4),
          clear;

      for (i = 0; i < num; i++) {
        thumb = new Thumb({
          url: data[i].article_image.thumb.url,
          link: data[i].link,
          short_title: data[i].short_title,
          title: data[i].title,
          parent: this,
          orientation: 'above' 
        });

        thumb.init();
        this.thumbs.push(thumb);

        // Hardcoded link to Bitesized Bio Channel 1
        if (i == 1) {
          thumb = new Thumb({
            url: 'http://bitesizebio.s3.amazonaws.com/wp-content/uploads/2014/02/bitesizebio-250.png',
            link: 'http://bitesizebio.com/category/technical-channels/protein-analysis-detection-and-assay/',
            short_title: 'Editor: Protein Analysis, Detection...',
            title: 'Editor: Protein Analysis, Detection & Assay',
            parent: this,
            orientation: 'above' 
          });

          thumb.init();
          this.thumbs.push(thumb);

          clear = document.createElement('div');
          clear.className = 'clear';
          this.node.appendChild(clear);
        }

        if (i == 3) {
          thumb = new Thumb({
            url: 'http://bitesizebio.s3.amazonaws.com/wp-content/uploads/2014/02/bitesizebio-250.png',
            link: 'http://bitesizebio.com/category/technical-channels/microscopy-imaging/',
            short_title: 'Editor: Microscopy & Imaging',
            title: 'Editor: Microscopy & Imaging',
            parent: this,
            orientation: 'above' 
          });

          thumb.init();
          this.thumbs.push(thumb);

          clear = document.createElement('div');
          clear.className = 'clear';
          this.node.appendChild(clear);
        }
      }
    }, 

    _hideSpinner: function() {
      this.node.innerHTML = '';
    },

    highlight: function(thumb) {
      for (var i = 0; i < this.thumbs.length; i++ ) {
        this.thumbs[i].dampen();
      }

      thumb.brighten();
    }
  }



  function Thumb(config) {
    this.url = config.url;
    this.link = config.link;
    this.short_title = config.short_title;
    this.title = config.title;
    this.parent = config.parent;
    this.orientation = config.orientation;
  } 

  Thumb.prototype = {
    init: function() {
      var this_obj = this;

      this._build();

      $(this.node).on('mouseover', function() {
        this_obj.parent.highlight(this_obj);
      });
    },

    _build: function() {
      this.node = document.createElement('a');
      this.node.className = 'thumb_container_link';
      this.node.href = this.link;
      this.node.target = '_blank';
      this.title_node = document.createElement('div');
      this.title_node.className = 'thumb_title_div';
      this.title_node.innerHTML = this.short_title;
      this.image_node = document.createElement('img');
      this.image_node.src = this.url;
      this.damper = document.createElement('div');
      this.damper.className = 'thumb_damper';
      this.parent.node.appendChild(this.node);
      this.node.appendChild(this.image_node);
      this.node.appendChild(this.title_node);
      this.node.appendChild(this.damper);
    },

    dampen: function() {
      this.damper.style.display = 'block';
      this.title_node.style.display = 'none';
      this.node.style.zIndex = 1;
      this.node.style.boxShadow = 'none';
    },

    brighten: function() {
      this.node.style.boxShadow = '.5em .5em 2em 0 #333';
      this.title_node.style.display = 'block';
      this.node.style.zIndex = 5;
      this.damper.style.display = 'none';
    },

    resetDamp: function() {
      this.damper.style.display = 'none';
      this.title_node.style.display = 'none';
      this.node.style.zIndex = 1;
      this.node.style.boxShadow = 'none';
    }
  }   


  return {
    init: function(config) {
      var data,
          controller;

      controller = new Controller({
        node: config.$container[0],
        url: config.url
      });

      controller.init();
    }
  }
})();

$(document).ready(function() {
  var $container;

  if ($('div#featured_articles').length) {
    $container = $('div#featured_articles');
    console.log($container[0]);
    ThumbCarousel.init({
      url: $container.attr('data-url'),
      $container: $container
    });
  }
});