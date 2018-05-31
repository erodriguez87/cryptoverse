$(document).ready(function(){

  $(".coinBtns").on("click", function(event) {
    let coin = $(this).attr("id"); 
    console.log(coin);
    getData(coin); 
    



    // switch(coin) {  
    //   case "ada":
    //     console.log('Cardano'); 
    //     break;
    //   case "bat":
    //     console.log('Basic Attention Token'); 
    //     break;
    //   case "btc":
    //     console.log('Bitcoin'); 
    //     break;
    //   case "doge":
    //     console.log('Dogecoin'); 
    //     break;
    //   case "eth":
    //     console.log('Ethereum');  
    //     break;
    //   case "ltc":
    //     console.log('Litecoin');  
    //     break;
    //   case "trx":
    //     console.log('TronCoin'); 
    //     break;
    //   case "ven":
    //     console.log('VeChain');  
    //     break;
    //   case "xlm":
    //     console.log('Stellar');  
    //     break;
    //   case "xrp":
    //     console.log('Ripple');  
    //     break;
    //   default:
    //       code 
    // }

  });

  function getData(coin) {
    $.get("/api/learn/" + coin, function(data) {
      console.log(data.name); 

    }); 
    // $.ajax({
    //   method: "GET",
    //   url: "/api/learn/" + coin
    // }).then(function(data) {
    // });
  };


});

// Pie Chart Logic
  (function(d3) {
    'use strict';

    let width = 360;
    let height = 360;
    let radius = Math.min(width, height) / 2;
    let donutWidth = 75;
    let legendRectSize = 18;
    let legendSpacing = 4;

    let color = d3.scaleOrdinal().range(['#494E6B','#192231']);

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

    let dataset = [
      { label: 'BTC', count:34},
      { label: 'All Others', count: 76}
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