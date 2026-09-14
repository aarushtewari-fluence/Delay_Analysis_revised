// fetch("delay_data.json")
// .then(response => response.json())
// .then(data => {

//     const total = data.length;

//     const onTime = data.filter(
//         x => x.Status.toLowerCase() === "on time"
//     ).length;

//     const delayed = data.filter(
//         x => x.Status.toLowerCase() === "delayed"
//     ).length;

//     const compliance =
//         ((onTime / total) * 100).toFixed(2);

//     document.getElementById("total").innerText =
//         total;

//     document.getElementById("ontime").innerText =
//         onTime;

//     document.getElementById("delayed").innerText =
//         delayed;

//     document.getElementById("compliance").innerText =
//         compliance + "%";    

//     const delayedRows =
//     data.filter(
//         row => row.Status.toLowerCase() === "delayed"
//     );

//     document.getElementById("delayTable").innerHTML =
//     delayedRows.map(row => `
//         <tr>
//             <td>${row.Month}</td>
//             <td>${row.Region}</td>
//             <td>${row.Site}</td>
//             <td>${row.Analyst}</td>
//             <td class="status-delayed">
//                 ${row.Status}
//             </td>
//         </tr>
//     `).join("");    

//     document.getElementById("exceptionText").innerText =
//     `${delayedRows.length} delayed reports requiring attention`;



// });


// fetch("delay_data.json")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(
//                 `Could not load delay_data.json. Status: ${response.status}`
//             );
//         }

//         return response.json();
//     })
//     .then(data => {

//         // Standardize status values once
//         const normalizedData = data.map(row => ({
//             ...row,
//             Status: String(row.Status || "").trim().toLowerCase()
//         }));

//         const monthFilter =
//          document.getElementById("monthFilter");
//         const uniqueMonths =
//         [...new Set(
//             normalizedData.map(
//                 row => row.Month
//                 )
//             )];

//         console.log("Months:", uniqueMonths);

//         uniqueMonths.forEach(month => {
//             console.log("Adding:", month);
//             const option =
//             document.createElement("option");
//             option.value = month;
//             option.textContent = month;
//             monthFilter.appendChild(option);
//         });

//         console.log(monthFilter.innerHTML);

//         monthFilter.addEventListener("change", function () {
//             const selectedMonth =
//             this.value;
//             console.log(
//                 "Selected Month:",
//                 selectedMonth
//             );
//         });



//         // -----------------------------
//         // 1. KPI calculations
//         // -----------------------------

//         const total = normalizedData.length;

//         const onTime = normalizedData.filter(
//             row => row.Status === "on time"
//         ).length;

//         const delayed = normalizedData.filter(
//             row => row.Status === "delayed"
//         ).length;

//         const compliance =
//             total === 0
//                 ? 0
//                 : ((onTime / total) * 100).toFixed(2);


//         // -----------------------------
//         // 2. Display KPI values
//         // -----------------------------

//         document.getElementById("total").innerText =
//             total;

//         document.getElementById("ontime").innerText =
//             onTime;

//         document.getElementById("delayed").innerText =
//             delayed;

//         document.getElementById("compliance").innerText =
//             compliance + "%";


//         // -----------------------------
//         // 3. Delayed reports table
//         // -----------------------------

//         const delayedRows = normalizedData.filter(
//             row => row.Status === "delayed"
//         );

//         document.getElementById("delayTable").innerHTML =
//             delayedRows.map(row => `
//                 <tr>
//                     <td>${row.Month}</td>
//                     <td>${row.Region}</td>
//                     <td>${row.Site}</td>
//                     <td>${row.Analyst}</td>
//                     <td class="status-delayed">
//                         Delayed
//                     </td>
//                 </tr>
//             `).join("");


//         // -----------------------------
//         // 4. Delayed report subtitle
//         // -----------------------------

//         document.getElementById("exceptionText").innerText =
//             `${delayedRows.length} delayed reports requiring attention`;


//         // -----------------------------
//         // 5. Build monthly summary
//         // -----------------------------

//         const monthSummary = {};

//         normalizedData.forEach(row => {

//             const month = row.Month;

//             if (!monthSummary[month]) {
//                 monthSummary[month] = {
//                     total: 0,
//                     onTime: 0
//                 };
//             }

//             monthSummary[month].total++;

//             if (row.Status === "on time") {
//                 monthSummary[month].onTime++;
//             }
//         });


//         // -----------------------------
//         // 6. Sort months correctly
//         // -----------------------------

//         const monthOrder = [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December"
//         ];

//         const months = Object.keys(monthSummary).sort(
//             (firstMonth, secondMonth) =>
//                 monthOrder.indexOf(firstMonth) -
//                 monthOrder.indexOf(secondMonth)
//         );


//         // -----------------------------
//         // 7. Calculate monthly compliance
//         // -----------------------------

//         const monthlyCompliance = months.map(month => {

//             const summary = monthSummary[month];

//             if (!summary || summary.total === 0) {
//                 return 0;
//             }

//             return Number(
//                 (
//                     summary.onTime /
//                     summary.total *
//                     100
//                 ).toFixed(2)
//             );
//         });

//         console.log("Month summary:", monthSummary);
//         console.log("Months:", months);
//         console.log(
//             "Monthly compliance:",
//             monthlyCompliance
//         );


//         // -----------------------------
//         // 8. Validate Chart.js and canvas
//         // -----------------------------

//         const monthlyCanvas =
//             document.getElementById("monthlyChart");

//         if (!monthlyCanvas) {
//             throw new Error(
//                 'The canvas id="monthlyChart" was not found in the HTML.'
//             );
//         }

//         if (typeof Chart === "undefined") {
//             throw new Error(
//                 "Chart.js is not loaded. Check the Chart.js script element in new.html."
//             );
//         }


//         // -----------------------------
//         // 9. Create monthly trend chart
//         // -----------------------------

//         new Chart(monthlyCanvas, {
//             type: "line",

//             data: {
//                 labels: months,

//                 datasets: [{
//                     label: "On-Time Compliance (%)",
//                     data: monthlyCompliance,

//                     borderColor: "#1677ff",
//                     backgroundColor:
//                         "rgba(22, 119, 255, 0.12)",

//                     borderWidth: 3,
//                     fill: true,
//                     tension: 0.3,

//                     pointRadius: 5,
//                     pointHoverRadius: 7,
//                     pointBackgroundColor: "#1677ff",
//                     pointBorderColor: "#ffffff",
//                     pointBorderWidth: 2
//                 }]
//             },

//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,

//                 interaction: {
//                     intersect: false,
//                     mode: "index"
//                 },

//                 plugins: {
//                     legend: {
//                         display: false
//                     },

//                     tooltip: {
//                         callbacks: {
//                             label: context =>
//                                 `${context.parsed.y}% on time`
//                         }
//                     }
//                 },

//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         max: 100,

//                         ticks: {
//                             callback: value =>
//                                 `${value}%`
//                         },

//                         title: {
//                             display: true,
//                             text: "On-Time Compliance"
//                         }
//                     },

//                     x: {
//                         grid: {
//                             display: false
//                         },

//                         title: {
//                             display: true,
//                             text: "Reporting Month"
//                         }
//                     }
//                 }
//             }
//         });

//         const regionSummary = {};
//         normalizedData.forEach(row => {
//             if (!regionSummary[row.Region]) {
//                 regionSummary[row.Region] = {
//                     total: 0,
//                     onTime: 0
//                 };
//             }

//             regionSummary[row.Region].total++;
//             if (row.Status === "on time") {
//                 regionSummary[row.Region].onTime++;
//             }

//         });

//         console.log(regionSummary);


//         const regions =
//            Object.keys(regionSummary);
//         const regionCompliance =
//            regions.map(region =>{
//             const summary =
//             regionSummary[region];
//             return Number(
//                 (
//                     summary.onTime /
//                     summary.total *
//                     100
//                 ).toFixed(2)

//             )
//         });

//         console.log(regions);
//         console.log(regionCompliance);

//         new Chart(
//             document.getElementById("regionChart"),
//             {
//                 type: "bar",
//                 data: {
//                     labels: regions,
//                     datasets: [{
//                         data: regionCompliance,
//                         backgroundColor: [
//                             "#1677ff",
//                             "#16855b",
//                             "#e49b2f"
//                         ]
//                     }]
//                 }
//             });


//             // options: {

//             //     responsive: true,
//             //     maintainAspectRatio: false,
//             //     plugins: {
//             //         title: {
//             //             display: true,
//             //             text: "Regional Compliance Comparison"
//             //             },
//             //             legend: {
//             //                 display: false
//             //                 }
//             //     }
//             //     scales: {
//             //         y: {
//             //             beginAtZero: true,
//             //             max: 100,
//             //             ticks: {
//             //                 callback: value => value + "%"
//             //             }
//             //         }
//             //     }
//             // });




//     })
//     .catch(error => {
//         console.error("Dashboard error:", error);
//     });

let regionChart;
let reasonChart;


fetch("Delay_Dashboard2.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(
                `Could not load delay_data.json. Status: ${response.status}`
            );
        }

        return response.json();
    })
    .then(data => {

        // Standardize status values once
        const normalizedData = data.map(row => ({
            ...row,
            Status: String(row.Status || "").trim().toLowerCase()
        }));

        const reasonRegionFilter =
            document.getElementById(
                "reasonRegionFilter"
            );

        const uniqueRegions =
            [...new Set(
                normalizedData.map(
                    row => row.Region
                )
            )];

        uniqueRegions.forEach(region => {

            const option =
                document.createElement("option");

            option.value = region;

            option.textContent = region;

            reasonRegionFilter.appendChild(
                option
            );

        });

        reasonRegionFilter.addEventListener(
            "change",
            function () {

                const selectedRegion =
                    this.value;

                const chartData =
                    selectedRegion === "All"
                        ? normalizedData
                        : normalizedData.filter(
                            row =>
                                row.Region ===
                                selectedRegion
                        );

                updateReasonChart(
                    chartData
                );

            }
        );

        const monthFilter =
            document.getElementById("monthFilter");
        const uniqueMonths =
            [...new Set(
                normalizedData.map(
                    row => row.Month
                )
            )];

        console.log("Months:", uniqueMonths);

        uniqueMonths.forEach(month => {
            console.log("Adding:", month);
            const option =
                document.createElement("option");
            option.value = month;
            option.textContent = month;
            monthFilter.appendChild(option);
        });

        updateRegionChart(normalizedData);
        updateReasonChart(normalizedData);
        updateReasonSummaryTable(normalizedData);

        console.log(monthFilter.innerHTML);

        monthFilter.addEventListener("change", function () {
            const selectedMonth =
                this.value;
            console.log(
                "Selected Month:",
                selectedMonth
            );

            const filteredData =
                selectedMonth === "All"
                    ? normalizedData
                    : normalizedData.filter(
                        row =>
                            row.Month === selectedMonth
                    );

            updateRegionChart(filteredData);
            updateReasonChart(filteredData);
            updateReasonSummaryTable(filteredData);

            console.log(filteredData);

            const total =
                filteredData.length;

            const onTime =
                filteredData.filter(
                    row => row.Status === "on time"
                ).length;


            const delayed =
                filteredData.filter(
                    row => row.Status === "delayed"
                ).length;



            const compliance =
                total === 0
                    ? 0
                    : (
                        onTime /
                        total *
                        100
                    ).toFixed(2);

            document.getElementById("total").innerText =
                total;

            document.getElementById("ontime").innerText =
                onTime;

            document.getElementById("delayed").innerText =
                delayed;

            document.getElementById("compliance").innerText =
                compliance + "%";


            const delayedRows =
                filteredData.filter(
                    row => row.Status === "delayed"
                );

            document.getElementById("delayTable").innerHTML =
                delayedRows.map(row => `
                 <tr>
                    <td>${row.Month}</td>
                    <td>${row.Region}</td>
                    <td>${row.Site}</td>
                    <td>${row.Analyst}</td>
                    <td class="status-delayed">
                     Delayed
                    </td> 
                    <td>
                      <span class="
                       ${row.Reason.includes("Central DAS")
                        ? "reason-das"
                        : row.Reason.includes("Performance Analyst")
                            ? "reason-analyst"
                            : "reason-fse"
                    }

                     ">
                       ${row.Reason} 
                      </span>
                    </td>   
                 </tr>
                 
                 `).join("");

            document.getElementById("exceptionText").innerText =
                `${delayedRows.length} delayed reports requiring attention`;


        });









        // -----------------------------
        // 1. KPI calculations
        // -----------------------------

        const total = normalizedData.length;

        const onTime = normalizedData.filter(
            row => row.Status === "on time"
        ).length;

        const delayed = normalizedData.filter(
            row => row.Status === "delayed"
        ).length;

        const compliance =
            total === 0
                ? 0
                : ((onTime / total) * 100).toFixed(2);


        // -----------------------------
        // 2. Display KPI values
        // -----------------------------

        document.getElementById("total").innerText =
            total;

        document.getElementById("ontime").innerText =
            onTime;

        document.getElementById("delayed").innerText =
            delayed;

        document.getElementById("compliance").innerText =
            compliance + "%";


        // -----------------------------
        // 3. Delayed reports table
        // -----------------------------

        const delayedRows = normalizedData.filter(
            row => row.Status === "delayed"
        );

        document.getElementById("delayTable").innerHTML =
            delayedRows.map(row => `
                <tr>
                    <td>${row.Month}</td>
                    <td>${row.Region}</td>
                    <td>${row.Site}</td>
                    <td>${row.Analyst}</td>
                    <td class="status-delayed">
                        Delayed
                    </td> 
                    <td>
                      <span class="
                       ${row.Reason.includes("Central DAS")
                    ? "reason-das"
                    : row.Reason.includes("Performance Analyst")
                        ? "reason-analyst"
                        : "reason-fse"
                }

                     ">
                       ${row.Reason} 
                      </span>
                    </td>       
                    </td>
                </tr>
            `).join("");


        // -----------------------------
        // 4. Delayed report subtitle
        // -----------------------------

        document.getElementById("exceptionText").innerText =
            `${delayedRows.length} delayed reports requiring attention`;


        // -----------------------------
        // 5. Build monthly summary
        // -----------------------------

        const monthSummary = {};

        normalizedData.forEach(row => {

            const month = row.Month;

            if (!monthSummary[month]) {
                monthSummary[month] = {
                    total: 0,
                    onTime: 0
                };
            }

            monthSummary[month].total++;

            if (row.Status === "on time") {
                monthSummary[month].onTime++;
            }
        });


        // -----------------------------
        // 6. Sort months correctly
        // -----------------------------

        const monthOrder = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const months = Object.keys(monthSummary).sort(
            (firstMonth, secondMonth) =>
                monthOrder.indexOf(firstMonth) -
                monthOrder.indexOf(secondMonth)
        );


        // -----------------------------
        // 7. Calculate monthly compliance
        // -----------------------------

        const monthlyCompliance = months.map(month => {

            const summary = monthSummary[month];

            if (!summary || summary.total === 0) {
                return 0;
            }

            return Number(
                (
                    summary.onTime /
                    summary.total *
                    100
                ).toFixed(2)
            );
        });

        console.log("Month summary:", monthSummary);
        console.log("Months:", months);
        console.log(
            "Monthly compliance:",
            monthlyCompliance
        );


        // -----------------------------
        // 8. Validate Chart.js and canvas
        // -----------------------------

        const monthlyCanvas =
            document.getElementById("monthlyChart");

        if (!monthlyCanvas) {
            throw new Error(
                'The canvas id="monthlyChart" was not found in the HTML.'
            );
        }

        if (typeof Chart === "undefined") {
            throw new Error(
                "Chart.js is not loaded. Check the Chart.js script element in new.html."
            );
        }


        // -----------------------------
        // 9. Create monthly trend chart
        // -----------------------------

        new Chart(monthlyCanvas, {
            type: "line",

            data: {
                labels: months,

                datasets: [{
                    label: "On-Time Compliance (%)",
                    data: monthlyCompliance,

                    borderColor: "#1677ff",
                    backgroundColor:
                        "rgba(22, 119, 255, 0.12)",

                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,

                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: "#1677ff",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: "index"
                },

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        callbacks: {
                            label: context =>
                                `${context.parsed.y}% on time`
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,

                        ticks: {
                            color: "#0B57B7",
                            callback: value =>
                                `${value}%`
                        },

                        title: {
                            color: "#0B57B7",
                            display: true,
                            text: "On-Time Compliance"
                        }
                    },

                    x: {

                        ticks: {
                            color: "#0B57B7"
                        },
                        grid: {
                            display: false
                        },

                        title: {
                            color: "#0B57B7",
                            display: true,
                            text: "Reporting Month"
                        }
                    }
                }
            }
        });




        // options: {

        //     responsive: true,
        //     maintainAspectRatio: false,
        //     plugins: {
        //         title: {
        //             display: true,
        //             text: "Regional Compliance Comparison"
        //             },
        //             legend: {
        //                 display: false
        //                 }
        //     }
        //     scales: {
        //         y: {
        //             beginAtZero: true,
        //             max: 100,
        //             ticks: {
        //                 callback: value => value + "%"
        //             }
        //         }
        //     }
        // });




    })
    .catch(error => {
        console.error("Dashboard error:", error);
    });

function updateRegionChart(data) {

    const regionSummary = {};
    const overallSummary = {};

    data.forEach(row => {

        const region = row.Region;

        if (!region) {
            return;
        }

        if (!regionSummary[region]) {
            regionSummary[region] = {
                total: 0,
                onTime: 0
            };
        }

        regionSummary[region].total++;

        if (row.Status === "on time") {
            regionSummary[region].onTime++;
        }

        let reason =
            row.Status === "on time"
                ? "On Time"
                : row.Reason;
        if (!overallSummary[reason]) {
            overallSummary[reason] = 0;
        }
        overallSummary[reason]++;
    });

    const preferredRegionOrder = [
        "Americas",
        "APAC",
        "EMEA"
    ];

    const regions = Object.keys(regionSummary).sort(
        (firstRegion, secondRegion) => {

            const firstIndex =
                preferredRegionOrder.indexOf(firstRegion);

            const secondIndex =
                preferredRegionOrder.indexOf(secondRegion);

            if (firstIndex === -1 && secondIndex === -1) {
                return firstRegion.localeCompare(secondRegion);
            }

            if (firstIndex === -1) {
                return 1;
            }

            if (secondIndex === -1) {
                return -1;
            }

            return firstIndex - secondIndex;
        }
    );

    const regionalCompliance = regions.map(region => {

        const summary = regionSummary[region];

        if (summary.total === 0) {
            return 0;
        }

        return Number(
            (
                summary.onTime /
                summary.total *
                100
            ).toFixed(2)
        );
    });

    const regionalColors =
        regionalCompliance.map(value => {

            if (value >= 0) {
                return " #0B57B7 ";
            }

            return "#808080";
        });

    const regionCanvas =
        document.getElementById("regionChart");

    if (!regionCanvas) {
        console.error(
            'Canvas id="regionChart" was not found.'
        );

        return;
    }

    if (regionChart) {
        regionChart.destroy();
    }

    regionChart = new Chart(regionCanvas, {
        type: "bar",

        data: {
            labels: regions,

            datasets: [{
                label: "On-Time Compliance (%)",
                data: regionalCompliance,
                backgroundColor: regionalColors,
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.80,
                categoryPercentage: 0.60,
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            layout: {
                padding: {
                    top: 0,
                    bottom: 0
                }
            },


            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: context =>
                            `${context.parsed.y}% on time`
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,

                    ticks: {
                        color: "#0B57B7",
                        callback: value =>
                            `${value}%`
                    },

                    title: {
                        color: "#0B57B7",
                        display: true,
                        text: "On-Time Compliance"
                    },

                    border: {
                        color: "#0B57B7"
                    }
                },

                x: {

                    ticks: {
                        color: "#0B57B7"
                    },

                    grid: {
                        color: "#D6E4F7",
                        display: false
                    },

                    border: {
                        color: "#0B57B7"
                    },

                    title: {
                        display: true,
                        text: "Region",
                        color: "#0B57B7"
                    }
                }
            }
        }
    });
}

function updateReasonChart(data) {

    // Keep only delayed reports
    const delayedData = data.filter(
        row => row.Status === "delayed"
    );

    const reasonSummary = {};

    delayedData.forEach(row => {

        const reason =
            String(row.Reason || "Reason not provided").trim();

        if (!reasonSummary[reason]) {
            reasonSummary[reason] = 0;
        }

        reasonSummary[reason]++;
    });

    const totalDelayed = delayedData.length;

    const reasons = Object.keys(reasonSummary);


    const reasonPercentages = reasons.map(reason => {

        if (totalDelayed === 0) {
            return 0;
        }

        return Number(
            (
                reasonSummary[reason] /
                totalDelayed *
                100
            ).toFixed(2)
        );
    });

    const reasonCounts = reasons.map(
        reason => reasonSummary[reason]
    );

    const reasonCanvas =
        document.getElementById("reasonChart");

    if (!reasonCanvas) {
        console.error(
            'Canvas id="reasonChart" was not found.'
        );

        return;
    }

    // Destroy the previous chart before redrawing
    if (reasonChart) {
        reasonChart.destroy();
    }



    reasonChart = new Chart(reasonCanvas, {
        type: "bar",

        data: {
            labels: reasons,

            datasets: [{
                label: "Share of Delayed Reports (%)",

                data: reasonPercentages,

                // Keep counts for tooltips
                reasonCounts: reasonCounts,

                backgroundColor: [
                    "#0B57B7",
                    "#667085"
                ],

                borderRadius: 8,
                borderSkipped: false
            }]
        },

        options: {
            indexAxis: "y",

            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: function (context) {

                            const percentage =
                                context.parsed.x;

                            const count =
                                context.dataset
                                    .reasonCounts[
                                context.dataIndex
                                ];

                            return `${percentage}% (${count} delayed report${count === 1 ? "" : "s"})`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,

                    ticks: {
                        color: "#0B57B7",
                        callback: value =>
                            `${value}%`
                    },

                    title: {
                        color: "#0B57B7",
                        display: true,
                        text: "Percentage of Delayed Reports"
                    }
                },

                y: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#0B57B7",
                        autoSkip: false
                    }
                }
            }
        }
    });
}

function updateReasonSummaryTable(data) {

    const tableBody =
        document.getElementById("reasonSummaryTable");

    if (!tableBody) {
        console.error(
            'Table body id="reasonSummaryTable" was not found.'
        );

        return;
    }


    // =============================================
    // 1. BUILD REGION AND REASON SUMMARY
    // =============================================

    const summary = {};

    data.forEach((row, rowIndex) => {

        const region =
            String(
                row.Region || "Unknown Region"
            ).trim();

        const status =
            String(
                row.Status || ""
            ).trim().toLowerCase();

        let reason =
            String(
                row.Reason || "Reason not provided"
            ).trim();

        /*
        Display all successfully completed reports
        consistently as "On Time".
        */
        if (status === "on time") {
            reason = "On Time";
        }


        // Create the regional group
        if (!summary[region]) {
            summary[region] = {
                total: 0,
                reasons: {}
            };
        }


        // Increase the region total
        summary[region].total++;


        // Create the reason group
        if (!summary[region].reasons[reason]) {
            summary[region].reasons[reason] = {
                count: 0,
                records: []
            };
        }


        // Increase the reason count
        summary[region]
            .reasons[reason]
            .count++;


        /*
        Store the underlying records so that they
        can be displayed when the reason is expanded.
        */
        summary[region]
            .reasons[reason]
            .records.push({
                rowIndex: rowIndex,
                month: row.Month || "",
                site: row.Site || "",
                analyst: row.Analyst || "",
                fse: row.FSE || "",
                status: status,
                reason: reason
            });

    });


    // =============================================
    // 2. SORT REGIONS
    // =============================================

    const preferredRegionOrder = [
        "Americas",
        "APAC",
        "EMEA"
    ];

    const regions =
        Object.keys(summary).sort(
            (firstRegion, secondRegion) => {

                const firstIndex =
                    preferredRegionOrder.indexOf(
                        firstRegion
                    );

                const secondIndex =
                    preferredRegionOrder.indexOf(
                        secondRegion
                    );

                if (
                    firstIndex === -1 &&
                    secondIndex === -1
                ) {
                    return firstRegion.localeCompare(
                        secondRegion
                    );
                }

                if (firstIndex === -1) {
                    return 1;
                }

                if (secondIndex === -1) {
                    return -1;
                }

                return firstIndex - secondIndex;
            }
        );


    // =============================================
    // 3. BUILD SUMMARY TABLE HTML
    // =============================================

    let tableHtml = "";

    let grandTotal = 0;

    regions.forEach(
        (region, regionIndex) => {

            const regionData =
                summary[region];

            const regionTotal =
                regionData.total;

            grandTotal += regionTotal;


            // Regional heading row
            tableHtml += `
                <tr class="region-summary-row">

                    <td>
                        
                        ${escapeHtml(region)}
                    </td>

                    <td>
                        ${regionTotal}
                    </td>

                    <td>
                    
                    </td>

                </tr>
            `;

            /*
            Sort On Time first, followed by the
            remaining delay reasons alphabetically.
            */
            const reasons =
                Object.keys(
                    regionData.reasons
                ).sort(
                    (firstReason, secondReason) => {

                        if (firstReason === "On Time") {
                            return -1;
                        }

                        if (secondReason === "On Time") {
                            return 1;
                        }

                        return firstReason.localeCompare(
                            secondReason
                        );
                    }
                );


            reasons.forEach(
                (reason, reasonIndex) => {

                    const reasonData =
                        regionData.reasons[reason];

                    const count =
                        reasonData.count;

                    const percentage =
                        regionTotal === 0
                            ? 0
                            : (
                                count /
                                regionTotal *
                                100
                            );

                    const percentageText =
                        percentage.toFixed(2) + "%";


                    /*
                    Create one unique ID for the hidden
                    detail row belonging to this reason.
                    */
                    const detailId =
                        `reason-details-${regionIndex}-${reasonIndex}`;


                    const isOnTime =
                        reason === "On Time";

                    const reasonTextClass =
                        isOnTime
                            ? "summary-on-time"
                            : "summary-delay-reason";

                    const percentageBarClass =
                        isOnTime
                            ? "percentage-success"
                            : "percentage-delay";


                    // Summary row for the reason
                    tableHtml += `
                        <tr class="reason-summary-row">

                            <td class="reason-label">

                                <button
                                    type="button"
                                    class="reason-toggle"
                                    data-target="${detailId}"
                                    aria-expanded="false"
                                    title="Show report details"
                                >
                                    +
                                </button>

                                <span class="${reasonTextClass}">
                                    ${escapeHtml(reason)}
                                </span>

                            </td>

                            <td>
                                ${count}
                            </td>

                            <td>

                                <div class="percentage-cell">

                                    <div class="percentage-track">

                                        <div
                                            class="
                                                percentage-fill
                                                ${percentageBarClass}
                                            "
                                            style="width: ${percentage}%"
                                        >
                                        </div>

                                    </div>

                                    <span class="percentage-value">
                                        ${percentageText}
                                    </span>

                                </div>

                            </td>

                        </tr>
                    `;


                    // Hidden detail row
                    tableHtml += `
                        <tr
                            id="${detailId}"
                            class="reason-detail-row"
                            hidden
                        >

                            <td colspan="3">

                                <div class="detail-container">

                                    <div class="detail-heading">

                                        <strong>
                                            ${escapeHtml(region)}
                                        </strong>

                                        <span>
                                            ${escapeHtml(reason)}
                                        </span>

                                    </div>

                                    <div class="detail-table-wrapper">

                                        <table class="detail-table">

                                            <thead>
                                                <tr>
                                                    <th>Month</th>
                                                    <th>Site</th>
                                                    <th>Analyst</th>
                                                    <th>FSE</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                ${reasonData.records
                            .map(record => {

                                const statusClass =
                                    record.status ===
                                        "on time"
                                        ? "detail-status-on-time"
                                        : "detail-status-delayed";

                                const statusText =
                                    record.status ===
                                        "on time"
                                        ? "On Time"
                                        : "Delayed";

                                return `
                                                            <tr>
                                                                <td>
                                                                    ${escapeHtml(record.month)}
                                                                </td>

                                                                <td>
                                                                    ${escapeHtml(record.site)}
                                                                </td>

                                                                <td>
                                                                    ${escapeHtml(record.analyst)}
                                                                </td>

                                                                <td>
                                                                    ${escapeHtml(record.fse)}
                                                                </td>

                                                                <td>
                                                                    <span class="${statusClass}">
                                                                        ${statusText}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        `;

                            })
                            .join("")}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </td>

                        </tr>
                    `;

                }
            );

        }
    );


    // =============================================
    // 4. GRAND TOTAL
    // =============================================

    tableHtml += `
        <tr class="grand-total-row">

            <td>
                Grand Total
            </td>

            <td>
                ${grandTotal}
            </td>

            <td>
            
            </td>

        </tr>
    `;

    // Region loops finished



    const overallSummary = {};

    data.forEach(row => {

        let reason =
            row.Status === "on time"
                ? "On Time"
                : row.Reason;

        if (!overallSummary[reason]) {
            overallSummary[reason] = 0;
        }

        overallSummary[reason]++;

    });

    tableHtml += `
    <tr class="overall-heading-row">
        <td colspan="3">
            Overall Summary
        </td>
    </tr>
`;

    Object.keys(overallSummary)
        .sort((a, b) => {

            if (a === "On Time") {
                return -1;
            }

            if (b === "On Time") {
                return 1;
            }

            return a.localeCompare(b);

        })
        .forEach(reason => {

            const count =
                overallSummary[reason];

            const percentage =
                (
                    count /
                    grandTotal *
                    100
                ).toFixed(2);

            tableHtml += `
    <tr class="overall-summary-row">

        <td>

            <span class="${reason === "On Time"
                    ? "summary-on-time"
                    : "summary-delay-reason"
                }">

             ${reason}

              </span>

         </td>

        <td>
            ${count}
        </td>

        <td>

            <div class="percentage-cell">

                <div class="percentage-track">

                    <div
                        class="percentage-fill ${reason === "On Time"
                    ? "percentage-success"
                    : reason.includes("Performance Analyst")
                        ? "percentage-warning"
                        : "percentage-delay"
                }"
                        style="width:${percentage}%">
                    </div>

                </div>

                <span class="percentage-value">
                    ${percentage}%
                </span>

            </div>

        </td>

    </tr>
`;
        });
    // =============================================
    // 5. DISPLAY THE TABLE
    // =============================================

    tableBody.innerHTML =
        tableHtml;


    // =============================================
    // 6. ADD EXPAND/COLLAPSE BEHAVIOR
    // =============================================

    const toggleButtons =
        tableBody.querySelectorAll(
            ".reason-toggle"
        );

    toggleButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    this.dataset.target;

                const detailRow =
                    document.getElementById(
                        targetId
                    );

                if (!detailRow) {
                    return;
                }

                const isCurrentlyHidden =
                    detailRow.hidden;

                detailRow.hidden =
                    !isCurrentlyHidden;

                this.textContent =
                    isCurrentlyHidden
                        ? "−"
                        : "+";

                this.setAttribute(
                    "aria-expanded",
                    String(isCurrentlyHidden)
                );

                this.title =
                    isCurrentlyHidden
                        ? "Hide report details"
                        : "Show report details";

            }
        );

    });

}


function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

