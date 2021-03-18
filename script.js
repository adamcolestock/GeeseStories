//adapted from Scott Murray's tutorial: https://alignedleft.com/tutorials/d3/drawing-divs



var datesChicago = [],
    sentencesChicago = [],
    citationsChicago = [],
    datesAustin = [],
    sentencesAustin = [],
    citationsAustin = [],
    headlines = [],
    margin = { top: 30, right: 30, bottom: 30, left: 30 },
    height = 5000 - margin.top - margin.bottom,
    width = screen.width - margin.left - margin.right;
    dotRadius = 7.5;
    dotOffset = 100; //offset of dots from timeline
    tooltipWidth = 400;

var tempColor,
    yScale,
    yAxisValues,
    yAxisTicks,
    yGuide,
    colors,
    tooltipChicago,
    tooltipAustin;
    




//load the Chicago data and assign values to my arrays
d3.json("data/geesedata-chicago.json").then(function (data) {
    var entries = data.data;
    // console.log(data);
    for (var i = 0; i < entries.length; i++) {
        datesChicago.push(new Date(entries[i].date));
        sentencesChicago.push(entries[i].sentence);
        citationsChicago.push(entries[i].citation);
        // console.log(entries[i].citation.split('.')[1]);

        //parse out headlines using split
        // headlines.push(entries[i].citation.Split('/''));
    }

    yScale = d3.scaleTime()
        // .domain([d3.min(datesChicago), d3.max(datesChicago)])
        .domain([new Date("1988-01-01T13:02"), d3.max(datesChicago)])
        .range([0,height]);

    yAxisTicks = d3.axisLeft(yScale.nice())
        .ticks(d3.timeYear.every(1))

    tooltipChicago = d3.select('body')
        .append('div')
        .style('max-width', tooltipWidth + 'px')
        .style('margin','auto')
        .style('position', 'absolute')
        .style('padding', '10px')
        .style("border", "solid")
        .style('background', 'white')
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("visibility", "hidden")


    d3.select('#viz').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.right + ')')
        .selectAll('circle').data(datesChicago)
        .enter().append('circle')
            .attr('fill', "black")
            .style('opacity', '0.5')
            .attr('cy', function(d){
                return yScale(d);
            })
            .attr('cx', width/2 - dotOffset - 50)
            .attr('r', dotRadius)

            .on('mouseover', function(a, d) {
                var targetIndex = datesChicago.indexOf(d);
                // tooltip.style('opacity', 1)
                tooltipChicago.style('visibility', 'visible')
                tooltipChicago.html(
                    '<div style="font-size: 1.2rem;">' + datesChicago[targetIndex].toDateString() + '</div>' +
                  '<div style="font-size: 1.6rem; font-weight: bold; text-align: center"><i>' +
                    sentencesChicago[targetIndex] + '</i></div>' +
                    '<br><div style="font-size: 1rem;">' + citationsChicago[targetIndex] + '</div>'
                )
                  .style('left', (event.pageX - tooltipWidth - 50) + 'px')
                  .style('top', (event.pageY) + 'px')
                //   .style('left', margin.left + 'px')
                //   .style('top', (event.pageY + 30) + 'px')
                tempColor = this.style.fill;
                d3.select(this)
                  .style('fill', 'red')
              })

            .on('mouseout', function(d) {
                tooltipChicago.html('')
                tooltipChicago.style('visibility', 'hidden')
                d3.select(this)
                    .style('fill', tempColor)
                });

    yGuide = d3.select('#viz svg').append('g')
        .style('font-size', '1rem')
        .attr('transform', 
        'translate(' + width/2 + ',' + margin.top + ')')
        .call(yAxisTicks)
});

//load the Austin data and assign values to my arrays
d3.json("data/geesedata-austin.json").then(function (data) {
    var entries = data.data;
    // console.log(data);
    for (var i = 0; i < entries.length; i++) {
        datesAustin.push(new Date(entries[i].date));
        sentencesAustin.push(entries[i].sentence);
        citationsAustin.push(entries[i].citation);
    }


    tooltipAustin = d3.select('body')
        .append('div')
        .style('max-width', tooltipWidth + 'px')
        .style('margin','auto')
        .style('position', 'absolute')
        .style('padding', '10px')
        .style("border", "solid")
        .style('background', 'white')
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("visibility", "hidden")


    d3.select('#viz svg')
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.right + ')')
        .selectAll('circle').data(datesAustin)
        .enter().append('circle')
            .attr('fill', "black")
            .style('opacity', '0.5')
            .attr('cy', function(d){
                return yScale(d);
            })
            .attr('cx', width/2 + dotOffset/2)
            .attr('r', dotRadius)

            .on('mouseover', function(a, d) {
                var targetIndex = datesAustin.indexOf(d);
                // tooltip.style('opacity', 1)
                tooltipAustin.style('visibility', 'visible')
                tooltipAustin.html(
                    '<div style="font-size: 1.2rem;">' + datesAustin[targetIndex].toDateString() + '</div>' +
                  '<div style="font-size: 1.6rem; font-weight: bold; text-align: center"><i>' +
                    sentencesAustin[targetIndex] + '</i></div>' +
                    '<br><div style="font-size: 1rem;">' + citationsAustin[targetIndex] + '</div>'
                )
                  .style('left', (event.pageX + 50) + 'px')
                  .style('top', (event.pageY) + 'px')
                tempColor = this.style.fill;
                d3.select(this)
                  .style('fill', 'red')
              })

            .on('mouseout', function(d) {
                tooltipAustin.html('')
                tooltipAustin.style('visibility', 'hidden')
                d3.select(this)
                    .style('fill', tempColor)
                })
});


