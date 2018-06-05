$(document).ready(function(){
  // listens for the click on the learn handle bar page. This chooses which coin to make our two calls about
  $(".coinBtns").on("click", function(event) {
    let coin = $(this).attr("id"); 
    getData(coin); 
    getCrypto(coin);
  });

  // Calls the route that talks to our internal database and posts the result on the html front end
  function getData(coin) {
    $.get("/api/learn/" + coin, function(coin) {
      // console.log(coin.name); 
      let infoDiv  = $(".coinInfo"); 
    $("#name").html(`${coin.name} (${coin.cryptoId})`); 
    $("#features").html(coin.features); 
    $("#markets").html(coin.markets); 
    $("#start").html(coin.started); 
    $("#description").html(coin.shortDesc); 
    $("#disadvantage").html(coin.disadvantages); 
    $("a#web").attr('href', coin.website); 
    $("a#git").attr('href', coin.github); 
    }); 
  };

  // Calls the crypto api from coinmarketcap and posts the prices on the learn page. also generates a pie chart with market information
  function getCrypto(coin) {
    $.get("/api/ticker/" + coin, function(coin,res){
      $("#price").html(`$${coin.price.toFixed(2)}`); 
      $("#chg1H").html(`${coin.chg1H}%`); 
      $("#chg24H").html(`${coin.chg24H}%`); 
      $("#chg7d").html(`${coin.chg7d}%`); 
      $("#mktCap").html(`$${coin.mktCap.toLocaleString('en-US', {style:"decimal",minimumFractionDigits: 0})}`); 
      
        (function(d3) {
          'use strict';

          $('#chart').empty();
          d3.selectAll(" svg > *").remove();
        
          let width = 360;
          let height = 360;
          let radius = Math.min(width, height) / 2;
          let donutWidth = 75;
          let legendRectSize = 18;
          let legendSpacing = 4;
        
          let color = d3.scaleOrdinal().range(['#2c5788','#f79f3e']);
        
          let svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
              ',' + (height / 2) + ')');
        
          let arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);
        
          let pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);
        
          let tooltip = d3.select('#chart')                             
            .append('div')                                              
            .attr('class', 'tooltip');                                
          tooltip.append('div')                                         
            .attr('class', 'label');                                    
          tooltip.append('div')                                         
            .attr('class', 'count');                                   
          tooltip.append('div')                                         
            .attr('class', 'percent');
            
          let marketPie = parseFloat(coin.mktCap.replace(/,/g, ''));
          let marketTotal = 343697420662
          let marketShare = marketPie/parseInt(marketTotal);

          let dataset = [
            { label: `${coin.symbol}`, count:`${(marketShare*100).toFixed(2)}`},
            { label: 'All Others', count: `${((1-marketShare)*100).toFixed(2)}`}
            ];
        
            let path = svg.selectAll('path')
              .data(pie(dataset))
              .enter()
              .append('path')
              .attr('d', arc)
              .attr('fill', function(d, i) {
                return color(d.data.label);
              });
        
            path.on('mouseover', function(d) {                      
              let total = d3.sum(dataset.map(function(d) {          
                return d.count;                                    
              }));                                                     
              tooltip.select('.label').html(d.data.label);         
              tooltip.select('.count').html(d.data.count + '%');    
              tooltip.style('display', 'block');                   
            });  
        
            path.on('mouseout', function() {                          
              tooltip.style('display', 'none');                        
            });                                                                                          
            let legend = svg.selectAll('.legend')
              .data(color.domain())
              .enter()
              .append('g')
              .attr('class', 'legend')
              .attr('transform', function(d, i) {
                let height = legendRectSize + legendSpacing;
                let offset =  height * color.domain().length / 2;
                let horz = -2 * legendRectSize;
                let vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
              });
        
            legend.append('rect')
              .attr('width', legendRectSize)
              .attr('height', legendRectSize)
              .style('fill', color)
              .style('stroke', color);
        
            legend.append('text')
              .attr('x', legendRectSize + legendSpacing)
              .attr('y', legendRectSize - legendSpacing)
              .text(function(d) { return d; });
        
        })(window.d3);   
    });
  }
  
  // function set up to populate the the learning slider on the top of the learn page.
  function runSlider (){
    var slideImageArray = []; 
    var slide1 = $('<img class="slideImages" id="slide1" src="assets/images/slide1.png">'); 
    var slide2 = $('<img class="slideImages" id="slide2" src="assets/images/slide2.png">'); 
    var slide3 = $('<img class="slideImages" id="slide3" src="assets/images/slide3.png">'); 
    var slide4 = $('<img class="slideImages" id="slide4" src="assets/images/slide4.png">'); 
    var slide5 = $('<img class="slideImages" id="slide5" src="assets/images/slide5.png">'); 
    var slide6 = $('<img class="slideImages" id="slide6" src="assets/images/slide6.png">'); 
    slideImageArray.push(slide1, slide2, slide3, slide4, slide5, slide6); 
    console.log(slideImageArray[0]); 
    var slide = 0
    $('.slider-container').html(slideImageArray[slide]); 
    
    $('.slideBtns').on('click', function() {
      var btn = $(this).attr('id'); 
      // console.log(btn);
      if (btn === "arrowBtnL") {
        slide = slide - 1; 
        if (slide < 0) {
          slide = (slideImageArray.length - 1); 
        }
      } else if (btn === "arrowBtnR") {
        slide = slide + 1; 
        if (slide > (slideImageArray.length - 1)) {
          slide = 0
        }
      }
      $('.slider-container').html(slideImageArray[slide]); 
    }); 
  };
  
  runSlider();
});