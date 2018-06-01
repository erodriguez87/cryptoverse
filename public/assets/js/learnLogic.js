$(document).ready(function(){

  $(".coinBtns").on("click", function(event) {
    let coin = $(this).attr("id"); 
    console.log(coin);
    getData(coin); 
    

    // "id": 1,
    // "cryptoId": "btc",
    // "name": "bitcoin",
    // "github": "https://github.com/bitcoin/bitcoin",
    // "website": "https://bitcoin.org/en/",
    // "shortDesc": "the grand daddy",
    // "features": "fast currency",
    // "markets": "currency",
    // "disadvantages": "expensive transactions, slow",
    // "started": "2009",
    // "createdAt": "2018-05-31T13:27:59.000Z",
    // "updatedAt": "2018-05-31T13:27:59.000Z"

  });

  function getData(coin) {
    $.get("/api/learn/" + coin, function(coin) {
      console.log(coin.name); 
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
    // $.ajax({
    //   method: "GET",
    //   url: "/api/learn/" + coin
    // }).then(function(data) {
    // });
  };


});

// Pie Chart Logic
  // (function(d3) {
  //   'use strict';

  //   let width = 360;
  //   let height = 360;
  //   let radius = Math.min(width, height) / 2;
  //   let donutWidth = 75;
  //   let legendRectSize = 18;
  //   let legendSpacing = 4;

  //   let color = d3.scaleOrdinal().range(['#494E6B','#192231']);

  //   let svg = d3.select('#chart')
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', 'translate(' + (width / 2) +
  //       ',' + (height / 2) + ')');

  //   let arc = d3.arc()
  //     .innerRadius(radius - donutWidth)
  //     .outerRadius(radius);

  //   let pie = d3.pie()
  //     .value(function(d) { return d.count; })
  //     .sort(null);

  //   let tooltip = d3.select('#chart')                               
  //     .append('div')                                                
  //     .attr('class', 'tooltip');                                    

  //   tooltip.append('div')                                           
  //     .attr('class', 'label');                                      

  //   tooltip.append('div')                                           
  //     .attr('class', 'count');                                      

  //   tooltip.append('div')                                           
  //     .attr('class', 'percent');                                    

  //   let dataset = [
  //     { label: 'BTC', count:34},
  //     { label: 'All Others', count: 76}
  //     ];

  //     let path = svg.selectAll('path')
  //       .data(pie(dataset))
  //       .enter()
  //       .append('path')
  //       .attr('d', arc)
  //       .attr('fill', function(d, i) {
  //         return color(d.data.label);
  //       });

  //     path.on('mouseover', function(d) {                            
  //       let total = d3.sum(dataset.map(function(d) {                
  //         return d.count;                                           
  //       }));                                                        
  //       tooltip.select('.label').html(d.data.label);                
  //       tooltip.select('.count').html(d.data.count + '%');                     
  //       tooltip.style('display', 'block');                          
  //     });                                                           

  //     path.on('mouseout', function() {                              
  //       tooltip.style('display', 'none');                           
  //     });                                                           
                                            
  //     let legend = svg.selectAll('.legend')
  //       .data(color.domain())
  //       .enter()
  //       .append('g')
  //       .attr('class', 'legend')
  //       .attr('transform', function(d, i) {
  //         let height = legendRectSize + legendSpacing;
  //         let offset =  height * color.domain().length / 2;
  //         let horz = -2 * legendRectSize;
  //         let vert = i * height - offset;
  //         return 'translate(' + horz + ',' + vert + ')';
  //       });

  //     legend.append('rect')
  //       .attr('width', legendRectSize)
  //       .attr('height', legendRectSize)
  //       .style('fill', color)
  //       .style('stroke', color);

  //     legend.append('text')
  //       .attr('x', legendRectSize + legendSpacing)
  //       .attr('y', legendRectSize - legendSpacing)
  //       .text(function(d) { return d; });


  // })(window.d3);