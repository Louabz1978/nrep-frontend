import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import schemas
import {
  countySchema,
  countyInitialValues,
  citySchema,
  cityInitialValues,
  areaSchema,
  areaInitialValues,
  updateCountySchema,
  updateCitySchema,
  updateAreaSchema,
  type CountyForm,
  type CityForm,
  type AreaForm,
  type UpdateCountyForm,
  type UpdateCityForm,
  type UpdateAreaForm,
} from "@/data/admin/schema/LocationSchemas";

// Import hooks
import useGetCounties from "@/hooks/admin/locations/useGetCounties";
import useGetCities from "@/hooks/admin/locations/useGetCities";
import useGetAreas from "@/hooks/admin/locations/useGetAreas";
import useCreateCounty from "@/hooks/admin/locations/useCreateCounty";
import useCreateCity from "@/hooks/admin/locations/useCreateCity";
import useCreateArea from "@/hooks/admin/locations/useCreateArea";
import useUpdateCounty from "@/hooks/admin/locations/useUpdateCounty";
import useUpdateCity from "@/hooks/admin/locations/useUpdateCity";
import useUpdateArea from "@/hooks/admin/locations/useUpdateArea";
import useDeleteCounty from "@/hooks/admin/locations/useDeleteCounty";
import useDeleteCity from "@/hooks/admin/locations/useDeleteCity";
import useDeleteArea from "@/hooks/admin/locations/useDeleteArea";

const LocationManagementWithSchemas: React.FC = () => {
  // State for managing forms and selections
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [editingCountyId, setEditingCountyId] = useState<number | null>(null);
  const [editingCityId, setEditingCityId] = useState<number | null>(null);
  const [editingAreaId, setEditingAreaId] = useState<number | null>(null);

  // Fetch data hooks
  const { counties, countiesQuery } = useGetCounties();
  const { cities, citiesQuery } = useGetCities({
    queryParams: { county_id: selectedCountyId },
  });
  const { areas, areasQuery } = useGetAreas({
    queryParams: { city_id: selectedCityId },
  });

  // Create hooks
  const { createCountyMutation } = useCreateCounty();
  const { createCityMutation } = useCreateCity();
  const { createAreaMutation } = useCreateArea();

  // Update hooks
  const { updateCountyMutation } = useUpdateCounty();
  const { updateCityMutation } = useUpdateCity();
  const { updateAreaMutation } = useUpdateArea();

  // Delete hooks
  const { deleteCountyMutation } = useDeleteCounty();
  const { deleteCityMutation } = useDeleteCity();
  const { deleteAreaMutation } = useDeleteArea();

  // Forms
  const countyForm = useForm<CountyForm>({
    resolver: joiResolver(countySchema),
    defaultValues: countyInitialValues,
  });

  const cityForm = useForm<CityForm>({
    resolver: joiResolver(citySchema),
    defaultValues: cityInitialValues,
  });

  const areaForm = useForm<AreaForm>({
    resolver: joiResolver(areaSchema),
    defaultValues: areaInitialValues,
  });

  const updateCountyForm = useForm<UpdateCountyForm>({
    resolver: joiResolver(updateCountySchema),
  });

  const updateCityForm = useForm<UpdateCityForm>({
    resolver: joiResolver(updateCitySchema),
  });

  const updateAreaForm = useForm<UpdateAreaForm>({
    resolver: joiResolver(updateAreaSchema),
  });

  // County handlers
  const handleCreateCounty = (data: CountyForm) => {
    createCountyMutation.mutate(data, {
      onSuccess: () => {
        countyForm.reset();
        countiesQuery.refetch();
      },
    });
  };

  const handleUpdateCounty = (data: UpdateCountyForm) => {
    if (!editingCountyId) return;

    updateCountyMutation.mutate(
      { id: editingCountyId, data },
      {
        onSuccess: () => {
          setEditingCountyId(null);
          updateCountyForm.reset();
          countiesQuery.refetch();
        },
      }
    );
  };

  const handleDeleteCounty = (id: number) => {
    if (window.confirm("Are you sure you want to delete this county?")) {
      deleteCountyMutation.mutate(
        { id },
        {
          onSuccess: () => {
            countiesQuery.refetch();
            citiesQuery.refetch();
          },
        }
      );
    }
  };

  // City handlers
  const handleCreateCity = (data: CityForm) => {
    createCityMutation.mutate(data, {
      onSuccess: () => {
        cityForm.reset();
        citiesQuery.refetch();
      },
    });
  };

  const handleUpdateCity = (data: UpdateCityForm) => {
    if (!editingCityId) return;

    updateCityMutation.mutate(
      { id: editingCityId, data },
      {
        onSuccess: () => {
          setEditingCityId(null);
          updateCityForm.reset();
          citiesQuery.refetch();
        },
      }
    );
  };

  const handleDeleteCity = (id: number) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      deleteCityMutation.mutate(
        { id },
        {
          onSuccess: () => {
            citiesQuery.refetch();
            areasQuery.refetch();
          },
        }
      );
    }
  };

  // Area handlers
  const handleCreateArea = (data: AreaForm) => {
    createAreaMutation.mutate(data, {
      onSuccess: () => {
        areaForm.reset();
        areasQuery.refetch();
      },
    });
  };

  const handleUpdateArea = (data: UpdateAreaForm) => {
    if (!editingAreaId) return;

    updateAreaMutation.mutate(
      { id: editingAreaId, data },
      {
        onSuccess: () => {
          setEditingAreaId(null);
          updateAreaForm.reset();
          areasQuery.refetch();
        },
      }
    );
  };

  const handleDeleteArea = (id: number) => {
    if (window.confirm("Are you sure you want to delete this area?")) {
      deleteAreaMutation.mutate(
        { id },
        {
          onSuccess: () => {
            areasQuery.refetch();
          },
        }
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Location Management with Validation
      </h1>

      {/* Counties Section */}
      <Card>
        <CardHeader>
          <CardTitle>Counties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={countyForm.handleSubmit(handleCreateCounty)}
            className="flex gap-2"
          >
            <div className="flex-1">
              <Input
                placeholder="County name"
                {...countyForm.register("name")}
                className={
                  countyForm.formState.errors.name ? "border-red-500" : ""
                }
              />
              {countyForm.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {countyForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={createCountyMutation.isPending}>
              {createCountyMutation.isPending ? "Creating..." : "Create County"}
            </Button>
          </form>

          <div className="space-y-2">
            {counties?.map((county) => (
              <div
                key={county.county_id}
                className="flex items-center gap-2 p-2 border rounded"
              >
                {editingCountyId === county.county_id ? (
                  <form
                    onSubmit={updateCountyForm.handleSubmit(handleUpdateCounty)}
                    className="flex gap-2 flex-1"
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="County name"
                        {...updateCountyForm.register("name")}
                        defaultValue={county.title}
                        className={
                          updateCountyForm.formState.errors.name
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {updateCountyForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {updateCountyForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <Button type="submit" size="sm">
                      Save
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCountyId(null);
                        updateCountyForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1">{county.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCountyId(county.county_id);
                        updateCountyForm.setValue("name", county.title);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCounty(county.county_id)}
                      disabled={deleteCountyMutation.isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={cityForm.handleSubmit(handleCreateCity)}
            className="flex gap-2"
          >
            <Select
              value={selectedCountyId?.toString()}
              onValueChange={(value) => {
                setSelectedCountyId(Number(value));
                cityForm.setValue("county_id", Number(value));
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select County" />
              </SelectTrigger>
              <SelectContent>
                {counties?.map((county) => (
                  <SelectItem
                    key={county.county_id}
                    value={county.county_id.toString()}
                  >
                    {county.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1">
              <Input
                placeholder="City name"
                {...cityForm.register("name")}
                className={
                  cityForm.formState.errors.name ? "border-red-500" : ""
                }
              />
              {cityForm.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {cityForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={createCityMutation.isPending || !selectedCountyId}
            >
              {createCityMutation.isPending ? "Creating..." : "Create City"}
            </Button>
          </form>

          <div className="space-y-2">
            {cities?.map((city) => (
              <div
                key={city.city_id}
                className="flex items-center gap-2 p-2 border rounded"
              >
                {editingCityId === city.city_id ? (
                  <form
                    onSubmit={updateCityForm.handleSubmit(handleUpdateCity)}
                    className="flex gap-2 flex-1"
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="City name"
                        {...updateCityForm.register("name")}
                        defaultValue={city.title}
                        className={
                          updateCityForm.formState.errors.name
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {updateCityForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {updateCityForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <Button type="submit" size="sm">
                      Save
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCityId(null);
                        updateCityForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1">{city.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCityId(city.city_id);
                        updateCityForm.setValue("name", city.title);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCity(city.city_id)}
                      disabled={deleteCityMutation.isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Areas Section */}
      <Card>
        <CardHeader>
          <CardTitle>Areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={areaForm.handleSubmit(handleCreateArea)}
            className="flex gap-2"
          >
            <Select
              value={selectedCityId?.toString()}
              onValueChange={(value) => {
                setSelectedCityId(Number(value));
                areaForm.setValue("city_id", Number(value));
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((city) => (
                  <SelectItem
                    key={city.city_id}
                    value={city.city_id.toString()}
                  >
                    {city.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1">
              <Input
                placeholder="Area name"
                {...areaForm.register("name")}
                className={
                  areaForm.formState.errors.name ? "border-red-500" : ""
                }
              />
              {areaForm.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {areaForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={createAreaMutation.isPending || !selectedCityId}
            >
              {createAreaMutation.isPending ? "Creating..." : "Create Area"}
            </Button>
          </form>

          <div className="space-y-2">
            {areas?.map((area) => (
              <div
                key={area.area_id}
                className="flex items-center gap-2 p-2 border rounded"
              >
                {editingAreaId === area.area_id ? (
                  <form
                    onSubmit={updateAreaForm.handleSubmit(handleUpdateArea)}
                    className="flex gap-2 flex-1"
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="Area name"
                        {...updateAreaForm.register("name")}
                        defaultValue={area.title}
                        className={
                          updateAreaForm.formState.errors.name
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {updateAreaForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {updateAreaForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <Button type="submit" size="sm">
                      Save
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingAreaId(null);
                        updateAreaForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1">{area.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingAreaId(area.area_id);
                        updateAreaForm.setValue("name", area.title);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteArea(area.area_id)}
                      disabled={deleteAreaMutation.isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationManagementWithSchemas;
