import { cx } from "@/lib/utils";
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { tv, type VariantProps } from "tailwind-variants";

interface DataItem {
    name: string;
    value?: number;
    children?: DataItem[];
}

interface ZoomableCirclePackProps extends VariantProps<typeof circlePackVariants> {
    data: DataItem;
    width?: number | string;
    height?: number | string;
    onCategoryClick?: (category: string) => void;
    onBackgroundClick?: () => void;
}

// Type for D3 node in our visualization
type CircleNode = d3.HierarchyCircularNode<DataItem>;

// Mapping between variant names and CSS variable names 
const variantToCSSVars = {
    default: {
        bg: 'var(--blue-50)',
        bgDark: 'var(--blue-400-10)',
        ring: 'var(--blue-500-30)',
        ringDark: 'var(--blue-400-30)',
        text: 'var(--blue-900)',
        textDark: 'var(--blue-400)'
    },
    neutral: {
        bg: 'var(--gray-50)',
        bgDark: 'var(--gray-400-10)',
        ring: 'var(--gray-500-30)',
        ringDark: 'var(--gray-400-20)',
        text: 'var(--gray-900)',
        textDark: 'var(--gray-400)'
    },
    success: {
        bg: 'var(--emerald-50)',
        bgDark: 'var(--emerald-400-10)',
        ring: 'var(--emerald-600-30)',
        ringDark: 'var(--emerald-400-20)',
        text: 'var(--emerald-900)',
        textDark: 'var(--emerald-400)'
    },
    error: {
        bg: 'var(--red-50)',
        bgDark: 'var(--red-400-10)',
        ring: 'var(--red-600-20)',
        ringDark: 'var(--red-400-20)',
        text: 'var(--red-900)',
        textDark: 'var(--red-400)'
    },
    warning: {
        bg: 'var(--yellow-50)',
        bgDark: 'var(--yellow-400-10)',
        ring: 'var(--yellow-600-30)',
        ringDark: 'var(--yellow-400-20)',
        text: 'var(--yellow-900)',
        textDark: 'var(--yellow-500)'
    }
};

// Define variants for the ZoomableCirclePack using tailwind-variants
const circlePackVariants = tv({
    base: cx(
        "relative flex items-center justify-center bg-white dark:bg-gray-950"
    ),
    variants: {
        variant: {
            default: [
                "text-blue-900 ring-blue-500/30",
                "dark:text-blue-400 dark:ring-blue-400/30",
            ],
            neutral: [
                "text-gray-900 ring-gray-500/30",
                "dark:text-gray-400 dark:ring-gray-400/20",
            ],
            success: [
                "text-emerald-900 ring-emerald-600/30",
                "dark:text-emerald-400 dark:ring-emerald-400/20",
            ],
            error: [
                "text-red-900 ring-red-600/20",
                "dark:text-red-400 dark:ring-red-400/20",
            ],
            warning: [
                "text-yellow-900 ring-yellow-600/30",
                "dark:text-yellow-500 dark:ring-yellow-400/20",
            ],
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

// CSS variables to inject in the document
const generateCSSVariables = () => {
    return `
    :root {
        --blue-50: rgb(239, 246, 255);
        --blue-400: rgb(96, 165, 250);
        --blue-400-10: rgba(96, 165, 250, 0.1);
        --blue-500-30: rgba(59, 130, 246, 0.3);
        --blue-400-30: rgba(96, 165, 250, 0.3);
        --blue-900: rgb(30, 58, 138);
        
        --gray-50: rgb(249, 250, 251);
        --gray-400: rgb(156, 163, 175);
        --gray-400-10: rgba(156, 163, 175, 0.1);
        --gray-500-30: rgba(107, 114, 128, 0.3);
        --gray-400-20: rgba(156, 163, 175, 0.2);
        --gray-900: rgb(17, 24, 39);
        
        --emerald-50: rgb(236, 253, 245);
        --emerald-400: rgb(52, 211, 153);
        --emerald-400-10: rgba(52, 211, 153, 0.1);
        --emerald-600-30: rgba(5, 150, 105, 0.3);
        --emerald-400-20: rgba(52, 211, 153, 0.2);
        --emerald-900: rgb(6, 78, 59);
        
        --red-50: rgb(254, 242, 242);
        --red-400: rgb(248, 113, 113);
        --red-400-10: rgba(248, 113, 113, 0.1);
        --red-600-20: rgba(220, 38, 38, 0.2);
        --red-400-20: rgba(248, 113, 113, 0.2);
        --red-900: rgb(127, 29, 29);
        
        --yellow-50: rgb(255, 251, 235);
        --yellow-400: rgb(250, 204, 21);
        --yellow-400-10: rgba(250, 204, 21, 0.1);
        --yellow-500: rgb(234, 179, 8);
        --yellow-600-30: rgba(202, 138, 4, 0.3);
        --yellow-400-20: rgba(250, 204, 21, 0.2);
        --yellow-900: rgb(113, 63, 18);
    }
    
    @media (prefers-color-scheme: dark) {
        :root {
            color-scheme: dark;
        }
    }
    `;
};

const ZoomableCirclePack: React.FC<ZoomableCirclePackProps> = ({
    data,
    width = '100%',
    height = '100%',
    variant = "default",
    onCategoryClick,
    onBackgroundClick,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const styleRef = useRef<HTMLStyleElement | null>(null);

    // Add CSS variables to document
    useEffect(() => {
        // Create style element if it doesn't exist
        if (!styleRef.current) {
            styleRef.current = document.createElement('style');
            document.head.appendChild(styleRef.current);
            styleRef.current.textContent = generateCSSVariables();
        }

        return () => {
            if (styleRef.current) {
                document.head.removeChild(styleRef.current);
                styleRef.current = null;
            }
        };
    }, []);

    // Calculate dimensions based on container size
    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        // Initial calculation
        updateDimensions();

        // Re-calculate on window resize
        window.addEventListener('resize', updateDimensions);

        // Listen for color scheme changes
        const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
        const handleColorSchemeChange = () => {
            // This will trigger a re-render when color scheme changes
            updateDimensions();
        };

        // Add listener for color scheme changes
        if (colorSchemeMedia.addEventListener) {
            colorSchemeMedia.addEventListener('change', handleColorSchemeChange);
        } else if (colorSchemeMedia.addListener) {
            // For older browsers
            colorSchemeMedia.addListener(handleColorSchemeChange);
        }

        return () => {
            window.removeEventListener('resize', updateDimensions);

            // Clean up color scheme listener
            if (colorSchemeMedia.removeEventListener) {
                colorSchemeMedia.removeEventListener('change', handleColorSchemeChange);
            } else if (colorSchemeMedia.removeListener) {
                // For older browsers
                colorSchemeMedia.removeListener(handleColorSchemeChange);
            }
        };
    }, []);

    useEffect(() => {
        if (!svgRef.current || !data || dimensions.width === 0 || dimensions.height === 0) return;

        // Clear any existing content
        d3.select(svgRef.current).selectAll('*').remove();

        // Get dimensions for the visualization
        const visWidth = dimensions.width;
        const visHeight = dimensions.height;

        // Detect dark mode
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Get CSS variable names for selected variant
        const varCss = variantToCSSVars[variant as keyof typeof variantToCSSVars] || variantToCSSVars.default;

        // Get colors based on dark mode
        const fillColor = isDarkMode ? varCss.bgDark : varCss.bg;
        const strokeColor = isDarkMode ? varCss.ringDark : varCss.ring;
        const textColor = isDarkMode ? varCss.textDark : varCss.text;
        const hoverStrokeColor = strokeColor; // Same as normal stroke for now

        // Category color mapping (using different variants for different categories)
        const categoryColors: Record<string, { fill: string, stroke: string, text: string, textDark: string }> = {
            "Bug": isDarkMode ?
                { fill: 'var(--red-400-10)', stroke: 'var(--red-400-20)', text: 'var(--red-900)', textDark: 'var(--red-400)' } :
                { fill: 'var(--red-50)', stroke: 'var(--red-600-20)', text: 'var(--red-900)', textDark: 'var(--red-400)' },
            "Question": isDarkMode ?
                { fill: 'var(--blue-400-10)', stroke: 'var(--blue-400-30)', text: 'var(--blue-900)', textDark: 'var(--blue-400)' } :
                { fill: 'var(--blue-50)', stroke: 'var(--blue-500-30)', text: 'var(--blue-900)', textDark: 'var(--blue-400)' },
            "Request": isDarkMode ?
                { fill: 'var(--emerald-400-10)', stroke: 'var(--emerald-400-20)', text: 'var(--emerald-900)', textDark: 'var(--emerald-400)' } :
                { fill: 'var(--emerald-50)', stroke: 'var(--emerald-600-30)', text: 'var(--emerald-900)', textDark: 'var(--emerald-400)' },
            "Complaint": isDarkMode ?
                { fill: 'var(--yellow-400-10)', stroke: 'var(--yellow-400-20)', text: 'var(--yellow-900)', textDark: 'var(--yellow-500)' } :
                { fill: 'var(--yellow-50)', stroke: 'var(--yellow-600-30)', text: 'var(--yellow-900)', textDark: 'var(--yellow-500)' },
            "Praise": isDarkMode ?
                { fill: 'var(--gray-400-10)', stroke: 'var(--gray-400-20)', text: 'var(--gray-900)', textDark: 'var(--gray-400)' } :
                { fill: 'var(--gray-50)', stroke: 'var(--gray-500-30)', text: 'var(--gray-900)', textDark: 'var(--gray-400)' },
        };

        // Compute the layout using d3.pack
        const pack = (data: DataItem) => d3.pack<DataItem>()
            .size([visWidth, visHeight])
            .padding(8) // More padding for better separation
            (d3.hierarchy(data)
                .sum(d => d.value || 0)
                .sort((a, b) => (b.value || 0) - (a.value || 0)));

        const root = pack(data);

        // Set up the SVG container with preserveAspectRatio for responsiveness
        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${visWidth} ${visHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("display", "block")
            .style("background", "transparent")
            .style("overflow", "visible")
            .style("cursor", "pointer")
            .style("color-scheme", "light dark"); // Support for light/dark mode

        // Create a group for centering the visualization
        const g = svg.append("g")
            .attr("transform", `translate(${visWidth / 2}, ${visHeight / 2})`);

        // Add circles for each node with styling from our CSS variables
        const node = g.selectAll<SVGCircleElement, CircleNode>("circle")
            .data(root.descendants().slice(1))
            .join("circle")
            .attr("fill", d => {
                // For top-level nodes (categories), use their specific color
                if (d.depth === 1) {
                    return categoryColors[d.data.name]?.fill || fillColor;
                }
                // For children nodes, use their parent's color 
                if (d.parent && d.parent.depth === 1) {
                    return categoryColors[d.parent.data.name]?.fill || fillColor;
                }
                // Default fallback
                return fillColor;
            })
            .attr("stroke", d => {
                // For top-level nodes (categories), use their specific color
                if (d.depth === 1) {
                    return categoryColors[d.data.name]?.stroke || strokeColor;
                }
                // For children nodes, use their parent's color
                if (d.parent && d.parent.depth === 1) {
                    return categoryColors[d.parent.data.name]?.stroke || strokeColor;
                }
                // Default fallback
                return strokeColor;
            })
            .attr("fill-opacity", 1)
            .attr("pointer-events", d => !d.children ? "none" : null)
            .attr("transform", d => `translate(${d.x - visWidth / 2},${d.y - visHeight / 2})`)
            .attr("r", d => d.r)
            .style("stroke-width", d => d.depth === 1 ? 2 : 0.5)
            .style("stroke-opacity", d => d.depth === 1 ? 0.7 : 0.3)
            .style("filter", "none")
            .on("mouseover", function (event, d) {
                // Get the circle element
                const circle = d3.select(this);

                // Get the stroke color based on node type
                let strokeColorToUse = hoverStrokeColor;
                if (d.depth === 1) {
                    strokeColorToUse = categoryColors[d.data.name]?.stroke || hoverStrokeColor;
                } else if (d.parent && d.parent.depth === 1) {
                    strokeColorToUse = categoryColors[d.parent.data.name]?.stroke || hoverStrokeColor;
                }

                // Apply hover styles
                circle
                    .attr("stroke", strokeColorToUse)
                    .style("stroke-width", d.depth === 1 ? 3 : 1.5)
                    .style("filter", "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.05))");
            })
            .on("mouseout", function (_, d) {
                // Get the circle element
                const circle = d3.select(this);

                // Get the original stroke color based on node type
                let strokeColorToUse = strokeColor;
                if (d.depth === 1) {
                    strokeColorToUse = categoryColors[d.data.name]?.stroke || strokeColor;
                } else if (d.parent && d.parent.depth === 1) {
                    strokeColorToUse = categoryColors[d.parent.data.name]?.stroke || strokeColor;
                }

                // Restore original styles
                circle
                    .attr("stroke", strokeColorToUse)
                    .style("stroke-width", d.depth === 1 ? 2 : 1)
                    .style("filter", "none");
            })
            .on("click", (event, d) => {
                // Always zoom to the clicked node regardless of current focus
                zoom(event, d);
                event.stopPropagation();
                console.log('[ZoomableCirclePack] Clicked node:', d.data.name, d);
            });

        // Add text labels with category-specific text colors
        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll<SVGTextElement, CircleNode>("text")
            .data(root.descendants())
            .join("text")
            .attr("transform", d => `translate(${d.x - visWidth / 2},${d.y - visHeight / 2})`)
            .style("fill-opacity", d => d.parent === root ? 1 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .each(function (d) {
                // Get the appropriate text color for this node
                let nodeTextColor = textColor;
                if (d.depth === 1) {
                    // For top-level categories, use their specific color
                    nodeTextColor = isDarkMode ?
                        categoryColors[d.data.name]?.textDark || textColor :
                        categoryColors[d.data.name]?.text || textColor;
                } else if (d.parent && d.parent.depth === 1) {
                    // For child nodes, use their parent category's color
                    nodeTextColor = isDarkMode ?
                        categoryColors[d.parent.data.name]?.textDark || textColor :
                        categoryColors[d.parent.data.name]?.text || textColor;
                }

                // Main label with category-specific text color
                d3.select(this)
                    .append("tspan")
                    .attr("class", "node-name")
                    .attr("fill", nodeTextColor)
                    .attr("x", 0)
                    .attr("y", d.depth === 1 ? 0 : -5)
                    .attr("font-size", () => {
                        if (d.depth === 1) {
                            return Math.min(d.r / 4, 18);
                        }
                        return Math.min(d.r / 3.5, 14);
                    })
                    .attr("font-weight", d.depth === 1 ? "600" : "500")
                    .style("font-family", "'Inter', 'Segoe UI', system-ui, sans-serif")
                    .style("text-shadow", "none")
                    .text(d.data.name);

                // Value label with matching color
                if ((d.depth > 1 || (d.depth === 1 && !d.children)) && d.r > 20 && d.value) {
                    d3.select(this)
                        .append("tspan")
                        .attr("class", "node-value")
                        .attr("fill", nodeTextColor)
                        .attr("x", 0)
                        .attr("y", 15)
                        .attr("font-size", Math.min(d.r / 5, 12))
                        .attr("font-weight", "600")
                        .style("font-family", "'Inter', 'Segoe UI', system-ui, sans-serif")
                        .style("text-shadow", "none")
                        .text(`${d.value} posts`);
                }

                // Count label with matching color
                if (d.depth === 1 && d.children && d.r > 30) {
                    d3.select(this)
                        .append("tspan")
                        .attr("class", "node-count")
                        .attr("fill", nodeTextColor)
                        .attr("x", 0)
                        .attr("y", d.r / 4 > 15 ? 20 : 15)
                        .attr("font-size", Math.min(d.r / 5, 12))
                        .attr("font-weight", "600")
                        .style("font-family", "'Inter', 'Segoe UI', system-ui, sans-serif")
                        .style("text-shadow", "none")
                        .text(`${d.children.length} items`);
                }
            });

        // Check for dark mode
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Create an elegant, modern tooltip for better information display
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "chart-tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background", isDark ? "rgba(17, 24, 39, 0.9)" : "rgba(249, 250, 251, 0.9)")
            .style("color", isDark ? "rgb(156, 163, 175)" : "rgb(17, 24, 39)")
            .style("padding", "12px 16px")
            .style("border-radius", "8px")
            .style("font-size", "12px")
            .style("line-height", "1.5")
            .style("font-family", "'Inter', 'Segoe UI', system-ui, sans-serif")
            .style("pointer-events", "none")
            .style("z-index", 10)
            .style("max-width", "250px")
            .style("box-shadow", isDark ? "0 5px 10px -3px rgba(0, 0, 0, 0.5)" : "0 5px 10px -3px rgba(0, 0, 0, 0.1)")
            .style("border", isDark ? "1px solid rgba(31, 41, 55, 0.8)" : "1px solid rgba(229, 231, 235, 0.8)")
            .style("backdrop-filter", "blur(8px)")
            .style("-webkit-backdrop-filter", "blur(8px)");

        // Update tooltip to use category colors for border
        node.on("mouseover", function (event, d) {
            // Use the text color from the CSS variables
            const secondaryTextColor = isDark ? "rgb(156, 163, 175)" : "rgb(107, 114, 128)";

            // Get category-specific color for the border
            let borderColor = textColor;
            if (d.depth === 1) {
                borderColor = isDarkMode ?
                    categoryColors[d.data.name]?.textDark || textColor :
                    categoryColors[d.data.name]?.text || textColor;
            } else if (d.parent && d.parent.depth === 1) {
                borderColor = isDarkMode ?
                    categoryColors[d.parent.data.name]?.textDark || textColor :
                    categoryColors[d.parent.data.name]?.text || textColor;
            }

            tooltip
                .style("visibility", "visible")
                .style("border-left", `4px solid ${borderColor}`)
                .html(`
                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: ${borderColor};">${d.data.name}</div>
                    ${d.parent && d.parent !== root ? `<div style="font-size: 11px; opacity: 0.8; margin-bottom: 6px; color: ${secondaryTextColor};">Category: ${d.parent.data.name}</div>` : ''}
                    <div style="font-size: 13px; margin-top: 6px; display: flex; align-items: center; justify-content: space-between;">
                        <span style="color: ${secondaryTextColor};">Posts:</span>
                        <span style="font-weight: 600; color: ${borderColor}">${d.value}</span>
                    </div>
                    ${d.children ? `
                        <div style="font-size: 13px; margin-top: 4px; display: flex; align-items: center; justify-content: space-between;">
                            <span style="color: ${secondaryTextColor};">Items:</span>
                            <span style="font-weight: 600; color: ${borderColor}">${d.children.length}</span>
                        </div>
                        <div style="font-size: 11px; margin-top: 8px; color: ${secondaryTextColor}; font-style: italic;">Click to explore items</div>
                    ` : ''}
                `)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("opacity", 0)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
            .on("mousemove", function (event) {
                tooltip
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 28}px`);
            })
            .on("mouseout", function () {
                tooltip
                    .transition()
                    .duration(300)
                    .style("opacity", 0)
                    .on("end", () => tooltip.style("visibility", "hidden"));
            });

        // Set up the zoom behavior
        svg.on("click", (event) => {
            // When clicking on the background, go back to root view
            zoom(event, root);

            // Also trigger the background click callback if provided
            if (onBackgroundClick) {
                onBackgroundClick();
            }
        });

        // Keep track of the current focus node and view
        let focus = root;
        let view: [number, number, number];

        // Initial zoom to the root node
        zoomTo([focus.x, focus.y, focus.r * 2]);

        // Function to handle zooming to a specific view
        function zoomTo(v: [number, number, number]) {
            console.log('[ZoomableCirclePack] Zooming to view:', v);
            const k = Math.min(visWidth, visHeight) / v[2];
            view = v;

            label.transition()
                .duration(750)
                .attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);

            node.transition()
                .duration(750)
                .attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`)
                .attr("r", d => d.r * k);

            // Update font size based on current zoom level - using type-safe approach
            label.selectAll<SVGTSpanElement, CircleNode>(".node-name")
                .transition()
                .duration(750)
                .attr("font-size", function () {
                    const d = d3.select(this.parentNode as SVGTextElement).datum() as CircleNode;
                    if (d.depth === 1) {
                        return Math.min((d.r * k) / 4, 18);
                    }
                    return Math.min((d.r * k) / 3.5, 14);
                });

            label.selectAll<SVGTSpanElement, CircleNode>(".node-value, .node-count")
                .transition()
                .duration(750)
                .attr("font-size", function () {
                    const d = d3.select(this.parentNode as SVGTextElement).datum() as CircleNode;
                    return Math.min((d.r * k) / 5, 12);
                });
        }

        // Function to handle zooming to a specific node
        function zoom(event: any, d: CircleNode) {
            console.log('[ZoomableCirclePack] zoom() called for:', d.data.name);

            // Set the new focus
            focus = d;

            // Call the category click handler if provided and if it's a category node
            if (d.depth === 1 && onCategoryClick) {
                console.log('[ZoomableCirclePack] Calling onCategoryClick for:', d.data.name);
                onCategoryClick(d.data.name);
            } else if (d === root && onBackgroundClick) { // Check if zooming back to root
                console.log('[ZoomableCirclePack] Calling onBackgroundClick (zoom to root)');
                onBackgroundClick();
            }

            // Calculate the target view [x, y, radius * 2]
            const v: [number, number, number] = [d.x, d.y, d.r * 2];

            // Transition to the new view
            zoomTo(v);
        }

        // Cleanup
        return () => {
            tooltip.remove();
        };

    }, [data, dimensions.width, dimensions.height, variant, onCategoryClick, onBackgroundClick]);

    return (
        <div
            ref={containerRef}
            className={circlePackVariants({ variant })}
            style={{
                width: width,
                height: height,
                position: 'relative',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                style={{
                    maxWidth: '100%',
                    height: '100%',
                    display: 'block'
                }}
            />
        </div>
    );
};

export default ZoomableCirclePack;