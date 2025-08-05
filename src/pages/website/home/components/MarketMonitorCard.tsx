// Filename: MarketMonitorCard.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // ChartArea, // Removed: Not exported by chart.js
  // ScriptableContext, // Removed: Not used directly here
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Select from "@/components/global/form/select/Select";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import cleanValues from "@/utils/cleanValues";
import {
  FilterChartsInitialValues,
  FilterChartsSchema,
  type FilterChartsType,
} from "@/data/website/schema/FilterCharts";
import Input from "@/components/global/form/input/Input";

// Register all necessary components and the datalabels plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels
);

// --- Correct Chart Data ---
// This data now matches the image exactly, in the correct top-to-bottom order.
const chartData = [
  { label: "اعلان جديد", value: 500 },
  { label: "العودة الى السوق", value: 320 },
  { label: "تغير السعر", value: 190 },
  { label: "نشط بموجب عقد", value: 350 },
  { label: "معلق", value: 430 },
  { label: "منتهي الصلاحية", value: 390 },
  { label: "مسحوب", value: 110 },
  { label: "ملغي", value: 275 },
];

const gradientColors = [
  ["#6dd875", "#c8eac9"], // Green
  ["#f8cd52", "#fceed5"], // Yellow
  ["#6caee0", "#c2dcf0"], // Blue
  ["#a5d6a7", "#e8f5e9"], // Light Green
  ["#aad1f1", "#dbeaf5"], // Light Blue
  ["#f9a46c", "#fde8d8"], // Orange
  ["#d8d8d8", "#f0f0f0"], // Grey
  ["#e67a7a", "#f7c3c3"], // Red
];

// --- Main Component ---
const MarketMonitorCard = () => {
  const form = useForm({
    resolver: joiResolver(FilterChartsSchema),
    defaultValues: cleanValues(
      FilterChartsInitialValues,
      FilterChartsInitialValues
    ),
    mode: "onChange",
  });

  const onSubmit = (data: FilterChartsType) => {
    console.log("Search data:", data);
    // Handle search submission here
  };

  const data = {
    // Use the labels from our chartData object
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        // Use the values from our chartData object
        data: chartData.map((item) => item.value),
        // We will generate gradients for the background color
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial render, return a fallback
            return "transparent";
          }

          // Reverse the gradient direction for RTL
          const gradient = ctx.createLinearGradient(
            chartArea.right,
            0,
            chartArea.left,
            0
          );
          const colors = gradientColors[context.dataIndex];
          gradient.addColorStop(1, colors[1]); // Start color (lighter)
          gradient.addColorStop(0, colors[0]); // End color (darker)
          return gradient;
        },
        // Set the bar border radius
        borderRadius: 5,
        barThickness: 36, // Set a fixed thickness for the bars
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // This makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // Hide the default legend and tooltip
      legend: { display: false },
      tooltip: { enabled: false },

      datalabels: {
        text: {
          anchor: "end", // Anchor to the left side of the bar (RTL)
          align: "right", // Align text to the left (RTL)
          offset: 8, // Add 8px padding from the end of the bar
          color: "#333",
          font: {
            weight: "bold",
            size: 16,
          },
          // Use a formatter to display the label text, not the value
          formatter: (value: any, context: any) => {
            return context.chart.data.labels[context.dataIndex];
          },
        },
        // --- Configuration for the VALUE labels (e.g., 500) ---
        // This block positions them INSIDE the bar on the right (RTL: left)
        value: {
          anchor: "start", // Anchor to the left side of the bar (RTL)
          align: "start", // Align text to the left (RTL)
          offset: 1, // Add 12px padding from the start of the bar
          color: "#555",
          font: {
            weight: "600",
            size: 14,
          },
          // Use a formatter to display the numeric value
          formatter: (value: any) => {
            return value;
          },
        },
        // Set display order: show value label only, not the default value label
        display: (context: any) => {
          // Only show value label for the value, not for the text
          return true;
        },
        // Use listeners to only show the value label on the right and text on the left
        labels: {
          text: {
            anchor: "end",
            align: "right",
            offset: -10,
            color: "#333",
            font: {
              weight: "bold",
              size: 16,
            },
            formatter: (value: any, context: any) =>
              context.chart.data.labels[context.dataIndex],
          },
          value: {
            anchor: "start",
            align: "start",
            offset: -10,
            color: "#555",
            font: {
              weight: "600",
              size: 14,
            },
            formatter: (value: any) => value,
          },
        },
      },
    },
    // Hide all scales (axes lines and labels)
    scales: {
      x: {
        display: false,
        max: 520, // Give some extra space for labels
        reverse: true, // Reverse the x-axis for RTL
      },
      y: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 40, // Add padding on the left to ensure values are not cut off (RTL: left)
        right: 0,
      },
    },
  };

  return (
    <div
      className="h-[500px] shadow-primary-shadow bg-tertiary-bg rounded-[var(--spacing-2xl)] p-[var(--spacing-xl)] min-h-[420px] flex flex-col justify-between"
      dir="rtl"
    >
      <h2 className="text-size28 font-bold text-right mb-[var(--spacing-lg)] text-secondary-fg">
        مراقب السوق
      </h2>
      {/* Changed height from 350 to 420 */}
      <div style={{ height: 420, width: "100%", position: "relative" }}>
        <Bar data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
      <div>
        <form>
          <div className="flex items-center justify-between gap-2">
          <Input
            form={form}
            label="التاريخ"
            name="date"
            placeholder=""
            type="date"
          />
            <Select
              form={form}
              label="المنطقة"
              name="area"
              placeholder=""
              choices={[
                { value: "riyadh", label: "الرياض" },
                { value: "jeddah", label: "جدة" },
                { value: "dammam", label: "الدمام" },
              ]}
              showValue="label"
              keyValue="value"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketMonitorCard;
