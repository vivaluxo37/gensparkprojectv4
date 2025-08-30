// Enhanced Trading Simulator Export & Sharing Features
// ADDITIVE MODULE - Adds PDF export, CSV download, and sharing capabilities
// Preserves all existing functionality while adding professional export features

class SimulatorExportManager {
    constructor() {
        this.results = null;
        this.insights = null;
        this.currentParams = null;
        this.currentStrategy = null;
        this.init();
    }

    init() {
        this.setupExportEventListeners();
        this.addExportStyles();
    }

    setupExportEventListeners() {
        // Enhanced CSV export
        document.addEventListener('click', (e) => {
            if (e.target.id === 'export-enhanced-results' || e.target.closest('#export-enhanced-results')) {
                this.exportToPDF();
            }
        });

        // Add additional export options
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('export-csv-btn')) {
                this.exportToCSV();
            } else if (e.target.classList.contains('export-json-btn')) {
                this.exportToJSON();
            } else if (e.target.classList.contains('print-results-btn')) {
                this.printResults();
            }
        });

        // Listen for results updates
        document.addEventListener('simulatorResultsUpdated', (e) => {
            this.updateExportData(e.detail);
        });
    }

    updateExportData(data) {
        this.results = data.results;
        this.insights = data.insights;
        this.currentParams = data.params;
        this.currentStrategy = data.strategy;
    }

    addExportStyles() {
        if (document.getElementById('export-print-styles')) return;

        const printStyles = document.createElement('style');
        printStyles.id = 'export-print-styles';
        printStyles.textContent = `
            @media print {
                body * {
                    visibility: hidden;
                }
                
                .print-content, .print-content * {
                    visibility: visible;
                }
                
                .print-content {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
                
                .no-print {
                    display: none !important;
                }
                
                .print-page-break {
                    page-break-before: always;
                }
                
                .print-table {
                    font-size: 10px;
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .print-table th,
                .print-table td {
                    border: 1px solid #ccc;
                    padding: 4px;
                    text-align: left;
                }
                
                .print-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .print-section {
                    margin-bottom: 20px;
                    page-break-inside: avoid;
                }
            }
            
            /* Export modal styles */
            .export-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .export-modal-content {
                background: white;
                border-radius: 8px;
                padding: 24px;
                max-width: 400px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .export-option {
                display: flex;
                align-items: center;
                padding: 12px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                margin-bottom: 8px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .export-option:hover {
                border-color: #3b82f6;
                background-color: #f3f4f6;
            }
            
            .export-option i {
                width: 24px;
                text-align: center;
                margin-right: 12px;
                color: #6b7280;
            }
            
            .export-progress {
                display: none;
                text-align: center;
                padding: 20px;
            }
            
            .export-progress .spinner {
                display: inline-block;
                width: 24px;
                height: 24px;
                border: 3px solid #f3f4f6;
                border-radius: 50%;
                border-top-color: #3b82f6;
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(printStyles);
    }

    async exportToPDF() {
        if (!this.results || !this.results.length) {
            this.showNotification('No results to export', 'error');
            return;
        }

        this.showExportModal();
    }

    showExportModal() {
        // Remove existing modal
        document.querySelectorAll('.export-modal').forEach(modal => modal.remove());

        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <div class="export-modal-content">
                <div class="export-options">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold">Export Results</h3>
                        <button class="close-export-modal text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="export-option" data-format="pdf">
                            <i class="fas fa-file-pdf text-red-500"></i>
                            <div>
                                <div class="font-medium">Professional PDF Report</div>
                                <div class="text-sm text-gray-600">Complete analysis with charts and insights</div>
                            </div>
                        </div>
                        
                        <div class="export-option" data-format="csv">
                            <i class="fas fa-file-csv text-green-500"></i>
                            <div>
                                <div class="font-medium">CSV Data Export</div>
                                <div class="text-sm text-gray-600">Raw data for spreadsheet analysis</div>
                            </div>
                        </div>
                        
                        <div class="export-option" data-format="json">
                            <i class="fas fa-file-code text-blue-500"></i>
                            <div>
                                <div class="font-medium">JSON Data Export</div>
                                <div class="text-sm text-gray-600">Structured data for developers</div>
                            </div>
                        </div>
                        
                        <div class="export-option" data-format="print">
                            <i class="fas fa-print text-gray-700"></i>
                            <div>
                                <div class="font-medium">Print Report</div>
                                <div class="text-sm text-gray-600">Print-friendly formatted report</div>
                            </div>
                        </div>
                        
                        <div class="export-option" data-format="share">
                            <i class="fas fa-share text-purple-500"></i>
                            <div>
                                <div class="font-medium">Share Results</div>
                                <div class="text-sm text-gray-600">Share via link or social media</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="export-progress">
                    <div class="spinner"></div>
                    <div class="mt-3 text-gray-600">Generating export...</div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.close-export-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', () => {
                const format = option.dataset.format;
                this.handleExportFormat(format, modal);
            });
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    async handleExportFormat(format, modal) {
        const progressDiv = modal.querySelector('.export-progress');
        const optionsDiv = modal.querySelector('.export-options');
        
        // Show progress
        optionsDiv.style.display = 'none';
        progressDiv.style.display = 'block';

        try {
            switch (format) {
                case 'pdf':
                    await this.generatePDFReport();
                    break;
                case 'csv':
                    this.exportToCSV();
                    break;
                case 'json':
                    this.exportToJSON();
                    break;
                case 'print':
                    this.printResults();
                    break;
                case 'share':
                    this.shareResults();
                    break;
            }
            
            modal.remove();
            this.showNotification(`Export completed successfully!`, 'success');
        } catch (error) {
            console.error('Export error:', error);
            this.showNotification('Export failed. Please try again.', 'error');
            
            // Show options again
            optionsDiv.style.display = 'block';
            progressDiv.style.display = 'none';
        }
    }

    async generatePDFReport() {
        // Generate HTML content for PDF
        const htmlContent = this.generatePDFContent();
        
        // Create a new window with the content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Wait for content to load, then trigger print
        setTimeout(() => {
            printWindow.print();
        }, 1000);
    }

    generatePDFContent() {
        const timestamp = new Date().toLocaleString();
        const strategy = this.currentStrategy || 'Unknown';
        const bestBroker = this.results[0];
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Trading Cost Analysis Report</title>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #eee;
                }
                
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    color: #1e40af;
                    margin-bottom: 10px;
                }
                
                .section {
                    margin-bottom: 30px;
                    page-break-inside: avoid;
                }
                
                .section h2 {
                    color: #1e40af;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }
                
                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 20px;
                }
                
                .metric-card {
                    background: #f9fafb;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #10b981;
                }
                
                .metric-value {
                    font-size: 24px;
                    font-weight: bold;
                    color: #059669;
                }
                
                .metric-label {
                    font-size: 14px;
                    color: #6b7280;
                    margin-top: 5px;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                
                th, td {
                    border: 1px solid #e5e7eb;
                    padding: 8px;
                    text-align: left;
                }
                
                th {
                    background: #f9fafb;
                    font-weight: 600;
                }
                
                .best-broker {
                    background: #ecfdf5 !important;
                }
                
                .insights-list {
                    list-style: none;
                    padding: 0;
                }
                
                .insights-list li {
                    background: #f0f9ff;
                    padding: 10px;
                    margin-bottom: 8px;
                    border-left: 4px solid #0ea5e9;
                    border-radius: 4px;
                }
                
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    font-size: 12px;
                    color: #6b7280;
                }
                
                @media print {
                    body { margin: 0; }
                    .page-break { page-break-before: always; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">
                    <i class="fas fa-chart-line"></i> BrokerAnalysis
                </div>
                <h1>Trading Cost Analysis Report</h1>
                <p>Generated on ${timestamp}</p>
            </div>

            <div class="section">
                <h2>Analysis Summary</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value">$${bestBroker.costs.totalCost}</div>
                        <div class="metric-label">Best Monthly Cost (${bestBroker.brokerName})</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">$${this.insights.summary.totalMonthlySavings.toFixed(2)}</div>
                        <div class="metric-label">Potential Monthly Savings</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">$${bestBroker.costs.costPerTrade}</div>
                        <div class="metric-label">Cost Per Trade (Best Broker)</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${bestBroker.qualityMetrics.suitabilityScore}/100</div>
                        <div class="metric-label">Strategy Compatibility Score</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Analysis Parameters</h2>
                <table>
                    <tr><td><strong>Trading Strategy</strong></td><td>${strategy}</td></tr>
                    <tr><td><strong>Position Size</strong></td><td>${this.currentParams.tradeSize} lots</td></tr>
                    <tr><td><strong>Monthly Trades</strong></td><td>${this.currentParams.tradesPerMonth}</td></tr>
                    <tr><td><strong>Primary Instrument</strong></td><td>${this.currentParams.instrument}</td></tr>
                    <tr><td><strong>Holding Period</strong></td><td>${this.currentParams.holdingPeriodDays} days</td></tr>
                </table>
            </div>

            <div class="section">
                <h2>Broker Comparison Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Broker</th>
                            <th>Total Cost</th>
                            <th>Spread Cost</th>
                            <th>Commission</th>
                            <th>Execution Speed</th>
                            <th>Suitability</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.results.map((result, index) => `
                            <tr class="${index === 0 ? 'best-broker' : ''}">
                                <td>${result.ranking}</td>
                                <td>${result.brokerName}${index === 0 ? ' ⭐' : ''}</td>
                                <td>$${result.costs.totalCost}</td>
                                <td>$${result.costs.spreadCost}</td>
                                <td>$${result.costs.commissionCost}</td>
                                <td>${result.qualityMetrics.executionSpeed}ms</td>
                                <td>${result.qualityMetrics.suitabilityScore}/100</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            ${this.insights && this.insights.recommendations.length > 0 ? `
            <div class="section page-break">
                <h2>Key Insights & Recommendations</h2>
                <ul class="insights-list">
                    ${this.insights.recommendations.map(rec => `
                        <li><strong>${rec.importance.toUpperCase()}:</strong> ${rec.message}</li>
                    `).join('')}
                    ${this.insights.optimizations.map(opt => `
                        <li><strong>OPTIMIZATION:</strong> ${opt.message}</li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}

            <div class="section">
                <h2>Cost Breakdown Analysis</h2>
                <p>The analysis shows that <strong>${bestBroker.brokerName}</strong> offers the most cost-effective solution for your ${strategy} trading strategy.</p>
                
                <h3>Cost Components (Best Broker)</h3>
                <ul>
                    <li>Spread Costs: $${bestBroker.costs.spreadCost} (${bestBroker.breakdown.spreadContribution}%)</li>
                    <li>Commission Costs: $${bestBroker.costs.commissionCost} (${bestBroker.breakdown.commissionContribution}%)</li>
                    <li>Slippage Costs: $${bestBroker.costs.slippageCost} (${bestBroker.breakdown.slippageContribution}%)</li>
                    <li>Swap Costs: $${bestBroker.costs.swapCost} (${bestBroker.breakdown.swapContribution}%)</li>
                </ul>
            </div>

            <div class="section">
                <h2>Methodology</h2>
                <p>This analysis uses advanced cost modeling that takes into account:</p>
                <ul>
                    <li>Real-time spread data and broker execution models</li>
                    <li>Strategy-specific cost sensitivities and trade frequencies</li>
                    <li>Market conditions and liquidity factors</li>
                    <li>Execution quality metrics including speed and fill rates</li>
                    <li>Swap/rollover costs based on holding periods</li>
                </ul>
                <p><em>Note: Results are estimates based on historical data and typical market conditions. Actual costs may vary.</em></p>
            </div>

            <div class="footer">
                <p>Generated by BrokerAnalysis.com - Professional Forex Broker Analysis Platform</p>
                <p>This report is for informational purposes only and does not constitute investment advice.</p>
            </div>
        </body>
        </html>
        `;
    }

    exportToCSV() {
        if (!this.results || !this.results.length) {
            this.showNotification('No results to export', 'error');
            return;
        }

        const headers = [
            'Rank', 'Broker', 'Total Monthly Cost', 'Cost Per Trade', 'Spread Cost', 'Commission Cost', 
            'Slippage Cost', 'Swap Cost', 'Execution Speed (ms)', 'Fill Rate (%)', 
            'Suitability Score', 'Additional Cost vs Best', 'Percentage More Expensive (%)',
            'Spread Contribution (%)', 'Commission Contribution (%)', 'Market Condition'
        ];
        
        const rows = this.results.map(result => [
            result.ranking,
            result.brokerName,
            result.costs.totalCost,
            result.costs.costPerTrade,
            result.costs.spreadCost,
            result.costs.commissionCost,
            result.costs.slippageCost,
            result.costs.swapCost,
            result.qualityMetrics.executionSpeed,
            result.qualityMetrics.fillRate,
            result.qualityMetrics.suitabilityScore,
            result.additionalCostVsBest,
            result.percentageMoreExpensive,
            result.breakdown.spreadContribution,
            result.breakdown.commissionContribution,
            result.marketCondition
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        this.downloadFile(csvContent, `trading-cost-analysis-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    }

    exportToJSON() {
        if (!this.results || !this.results.length) {
            this.showNotification('No results to export', 'error');
            return;
        }

        const exportData = {
            timestamp: new Date().toISOString(),
            parameters: this.currentParams,
            strategy: this.currentStrategy,
            results: this.results,
            insights: this.insights,
            metadata: {
                version: '1.0',
                source: 'BrokerAnalysis Enhanced Simulator',
                url: window.location.href
            }
        };

        const jsonContent = JSON.stringify(exportData, null, 2);
        this.downloadFile(jsonContent, `trading-analysis-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    }

    printResults() {
        // Create print-friendly content
        const printContent = this.generatePrintContent();
        
        // Create temporary container
        const printContainer = document.createElement('div');
        printContainer.className = 'print-content';
        printContainer.innerHTML = printContent;
        printContainer.style.display = 'none';
        
        document.body.appendChild(printContainer);
        
        // Show only print content
        document.body.classList.add('printing');
        printContainer.style.display = 'block';
        
        // Trigger print
        window.print();
        
        // Cleanup
        setTimeout(() => {
            document.body.classList.remove('printing');
            printContainer.remove();
        }, 1000);
    }

    generatePrintContent() {
        const timestamp = new Date().toLocaleString();
        const bestBroker = this.results[0];
        
        return `
            <div class="print-section print-header">
                <h1>BrokerAnalysis - Trading Cost Report</h1>
                <p>Generated: ${timestamp}</p>
            </div>
            
            <div class="print-section">
                <h2>Summary</h2>
                <p><strong>Best Broker:</strong> ${bestBroker.brokerName}</p>
                <p><strong>Monthly Cost:</strong> $${bestBroker.costs.totalCost}</p>
                <p><strong>Cost per Trade:</strong> $${bestBroker.costs.costPerTrade}</p>
                <p><strong>Potential Savings:</strong> $${this.insights.summary.totalMonthlySavings.toFixed(2)}</p>
            </div>
            
            <div class="print-section">
                <h2>Detailed Results</h2>
                <table class="print-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Broker</th>
                            <th>Total Cost</th>
                            <th>Spread</th>
                            <th>Commission</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.results.map(result => `
                            <tr>
                                <td>${result.ranking}</td>
                                <td>${result.brokerName}</td>
                                <td>$${result.costs.totalCost}</td>
                                <td>$${result.costs.spreadCost}</td>
                                <td>$${result.costs.commissionCost}</td>
                                <td>${result.qualityMetrics.executionSpeed}ms</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="print-section">
                <h2>Analysis Parameters</h2>
                <p><strong>Strategy:</strong> ${this.currentStrategy}</p>
                <p><strong>Position Size:</strong> ${this.currentParams.tradeSize} lots</p>
                <p><strong>Monthly Trades:</strong> ${this.currentParams.tradesPerMonth}</p>
                <p><strong>Instrument:</strong> ${this.currentParams.instrument}</p>
            </div>
        `;
    }

    shareResults() {
        const url = window.location.href;
        const bestBroker = this.results[0];
        const text = `Check out my trading cost analysis: ${bestBroker.brokerName} offers the best value at $${bestBroker.costs.totalCost}/month. Compare brokers at BrokerAnalysis.`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Trading Cost Analysis Results',
                text: text,
                url: url
            }).catch(err => {
                console.error('Error sharing:', err);
                this.fallbackShare(text, url);
            });
        } else {
            this.fallbackShare(text, url);
        }
    }

    fallbackShare(text, url) {
        // Show sharing options modal
        const shareModal = document.createElement('div');
        shareModal.className = 'export-modal';
        shareModal.innerHTML = `
            <div class="export-modal-content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold">Share Results</h3>
                    <button class="close-share-modal text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-3">
                    <div class="share-option" data-method="copy">
                        <i class="fas fa-copy text-blue-500"></i>
                        <div>
                            <div class="font-medium">Copy Link</div>
                            <div class="text-sm text-gray-600">Copy results summary to clipboard</div>
                        </div>
                    </div>
                    
                    <div class="share-option" data-method="email">
                        <i class="fas fa-envelope text-red-500"></i>
                        <div>
                            <div class="font-medium">Share via Email</div>
                            <div class="text-sm text-gray-600">Send results via email</div>
                        </div>
                    </div>
                    
                    <div class="share-option" data-method="twitter">
                        <i class="fab fa-twitter text-blue-400"></i>
                        <div>
                            <div class="font-medium">Share on Twitter</div>
                            <div class="text-sm text-gray-600">Post results to Twitter</div>
                        </div>
                    </div>
                    
                    <div class="share-option" data-method="linkedin">
                        <i class="fab fa-linkedin text-blue-600"></i>
                        <div>
                            <div class="font-medium">Share on LinkedIn</div>
                            <div class="text-sm text-gray-600">Post results to LinkedIn</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(shareModal);

        // Style share options
        shareModal.querySelectorAll('.share-option').forEach(option => {
            option.className += ' export-option';
        });

        // Event listeners
        shareModal.querySelector('.close-share-modal').addEventListener('click', () => {
            shareModal.remove();
        });

        shareModal.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', () => {
                const method = option.dataset.method;
                this.executeShare(method, text, url);
                shareModal.remove();
            });
        });
    }

    executeShare(method, text, url) {
        switch (method) {
            case 'copy':
                navigator.clipboard.writeText(`${text} ${url}`).then(() => {
                    this.showNotification('Results copied to clipboard!', 'success');
                });
                break;
                
            case 'email':
                const emailUrl = `mailto:?subject=Trading Cost Analysis Results&body=${encodeURIComponent(text + '\n\n' + url)}`;
                window.open(emailUrl);
                break;
                
            case 'twitter':
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                window.open(twitterUrl, '_blank', 'width=550,height=420');
                break;
                
            case 'linkedin':
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(linkedinUrl, '_blank', 'width=550,height=420');
                break;
        }
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        const colors = {
            info: 'bg-blue-500',
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500'
        };

        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize export manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/simulator') {
        window.simulatorExportManager = new SimulatorExportManager();
    }
});

// Export for global access
window.SimulatorExportManager = SimulatorExportManager;