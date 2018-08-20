import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SimpleCalcs from '../engine/SimpleCalcs'


import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, Label, LabelList, 
  } from 'recharts';

function dlrFmt(value) {
  return "$"+value.toLocaleString ( navigator.language, { maximumFractionDigits: 0 })
}
function getmax(maxValue, currentValue) {
    return Math.max(maxValue, currentValue.wealth, currentValue.spend);
}
function fmtTooltip( value ) {
  return "$" + value.toLocaleString( navigator.language, { maximumFractionDigits : 0 });
}


class CustomizedLabel extends Component {
  render () {
    const {x, y, stroke, value} = this.props;
    
    if ( value.length > 0 ) {
        return (
          <svg>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
              </marker>
              <marker id="arrow2" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="strokeWidth" markerWidth="4" markerHeight="3" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" />
              </marker>
            </defs>

            <line x1={x} y1={y-20} x2={x} y2={y-5} stroke="#000" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x={x} y={y} dy={-25} fill={stroke} fontSize={12} textAnchor="middle">{value}</text>

          </svg>
          );
    }

    return null;
  }
}

const calcs = new SimpleCalcs()			// engine that does calcs, builds data to graph

class ChartView extends Component {
  render() {
//    const kYTickSize = 5000000;
    const { peopleAssumptions } = this.props;

    calcs.doCalcs( peopleAssumptions );
    var data = calcs.years;

    // Calculate Y ticks
    const maxV = calcs.years.reduce( getmax, 0 );
    const kMillion = 1000000;

    var kTickSize = kMillion;
    if ( maxV > 5*kMillion)
      kTickSize = 5*kMillion;
    if ( maxV > 24*kMillion)
      kTickSize = 10*kMillion;

    var kMax = maxV / kTickSize;
    kMax = Math.ceil(kMax);
    kMax = kMax * kTickSize;

    var ticks = [];
    for ( var tickV = 0; tickV <= kMax; tickV += kTickSize ) {
      ticks.push(tickV);
    }

    return (
      <div>
          <ResponsiveContainer aspect={3.0} width="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
            >
              <Legend verticalAlign="middle" layout="vertical"  align="right" />
              <XAxis dataKey="age">
                <Label value="Age" position="bottom" />
                </XAxis>
              <YAxis 
                tickFormatter={dlrFmt} 
                ticks={ticks}
                />
              <Tooltip 
                formatter={fmtTooltip}
                cursor={false} 
                />

              <Line type='monotone' dataKey='wealth' stroke='#ff7300' isAnimationActive={false} dot={true} >
                <LabelList dataKey='note' position="top" content={<CustomizedLabel />} />
              </Line>
              <Line type='monotone' dataKey='spend' stroke='#73ff00' isAnimationActive={false} dot={true} />

           </LineChart>
          </ResponsiveContainer>
      </div>
    );
  }
}

ChartView.propTypes = {
  peopleAssumptions: PropTypes.object.isRequired
}

export default ChartView