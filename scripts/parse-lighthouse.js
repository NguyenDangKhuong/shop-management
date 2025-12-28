#!/usr/bin/env node

/**
 * Parse Lighthouse JSON report and display key metrics
 */

const fs = require('fs');
const path = require('path');

const reportPath = path.join(process.cwd(), 'lighthouse-reports', 'report.json');

if (!fs.existsSync(reportPath)) {
    console.error('❌ Lighthouse report not found. Run test:perf:json first.');
    process.exit(1);
}

try {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    const performance = report.categories.performance;
    const audits = report.audits;

    console.log('\n📊 Lighthouse Performance Report');
    console.log('=================================\n');

    // Performance Score
    const score = Math.round(performance.score * 100);
    const scoreEmoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
    console.log(`${scoreEmoji} Performance Score: ${score}/100\n`);

    // Core Web Vitals
    console.log('Core Web Vitals:');
    console.log('----------------');

    const lcp = audits['largest-contentful-paint'];
    const lcpValue = lcp.numericValue / 1000;
    const lcpPass = lcpValue < 2.5 ? '✅' : '❌';
    console.log(`${lcpPass} LCP: ${lcp.displayValue} (target: < 2.5s)`);

    const fcp = audits['first-contentful-paint'];
    const fcpValue = fcp.numericValue / 1000;
    const fcpPass = fcpValue < 1.8 ? '✅' : '❌';
    console.log(`${fcpPass} FCP: ${fcp.displayValue} (target: < 1.8s)`);

    const tbt = audits['total-blocking-time'];
    const tbtValue = tbt.numericValue;
    const tbtPass = tbtValue < 200 ? '✅' : '❌';
    console.log(`${tbtPass} TBT: ${tbt.displayValue} (target: < 200ms)`);

    const cls = audits['cumulative-layout-shift'];
    const clsValue = cls.numericValue;
    const clsPass = clsValue < 0.1 ? '✅' : '❌';
    console.log(`${clsPass} CLS: ${cls.displayValue} (target: < 0.1)`);

    const si = audits['speed-index'];
    const siValue = si.numericValue / 1000;
    const siPass = siValue < 3.4 ? '✅' : '❌';
    console.log(`${siPass} SI:  ${si.displayValue} (target: < 3.4s)`);

    console.log('\n');

    // LCP Target Check
    if (lcpValue < 1.5) {
        console.log('🎉 LCP Target MET! (' + lcp.displayValue + ' < 1.5s)');
    } else {
        console.log('⚠️  LCP Target MISSED (' + lcp.displayValue + ' > 1.5s)');
        console.log('\n💡 LCP Element:');
        if (lcp.details && lcp.details.items) {
            lcp.details.items.forEach(item => {
                if (item.node) {
                    console.log('   ' + (item.node.snippet || item.node.nodeLabel));
                }
            });
        }
    }

    console.log('\n📄 Full report: lighthouse-reports/report.json');
    console.log('   View in browser: open lighthouse-reports/report.json\n');

    // Exit with error if performance score < 90
    if (score < 90) {
        console.log('❌ Performance score below 90. Check the report for details.\n');
        process.exit(1);
    }

} catch (error) {
    console.error('❌ Error parsing Lighthouse report:', error.message);
    process.exit(1);
}
