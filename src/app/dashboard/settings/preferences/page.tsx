"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Settings, Globe, Clock, Volume2, Eye } from "lucide-react";

const PreferencesPage = () => {
    const { data: session } = useSession();
    const toast = useRef<Toast>(null);

    const [preferences, setPreferences] = useState({
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        emailNotifications: true,
        pushNotifications: true,
        soundEnabled: true,
        soundVolume: 50,
        darkMode: false,
        compactView: false,
        showAvatars: true,
        autoSave: true,
        autoSaveInterval: 5,
    });

    const languages = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
    ];

    const timezones = [
        { label: 'UTC', value: 'UTC' },
        { label: 'EST (UTC-5)', value: 'EST' },
        { label: 'PST (UTC-8)', value: 'PST' },
        { label: 'GMT (UTC+0)', value: 'GMT' },
    ];

    const dateFormats = [
        { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
        { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
        { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    ];

    const timeFormats = [
        { label: '12 Hour', value: '12h' },
        { label: '24 Hour', value: '24h' },
    ];

    const handleSave = () => {
        // Here you would typically save to your backend
        toast.current?.show({
            severity: 'success',
            summary: 'Preferences Saved',
            detail: 'Your preferences have been updated successfully.',
            life: 3000
        });
    };

    const handleReset = () => {
        setPreferences({
            language: 'en',
            timezone: 'UTC',
            dateFormat: 'MM/DD/YYYY',
            timeFormat: '12h',
            emailNotifications: true,
            pushNotifications: true,
            soundEnabled: true,
            soundVolume: 50,
            darkMode: false,
            compactView: false,
            showAvatars: true,
            autoSave: true,
            autoSaveInterval: 5,
        });
        
        toast.current?.show({
            severity: 'info',
            summary: 'Preferences Reset',
            detail: 'All preferences have been reset to default values.',
            life: 3000
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Toast ref={toast} />
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Settings className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Preferences</h1>
                    <p className="text-gray-600">Customize your experience</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Language & Region */}
                <Card className="h-fit">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="text-blue-600" size={20} />
                        <h3 className="text-lg font-semibold">Language & Region</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                            </label>
                            <Dropdown
                                value={preferences.language}
                                options={languages}
                                onChange={(e) => setPreferences({...preferences, language: e.value})}
                                className="w-full"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Timezone
                            </label>
                            <Dropdown
                                value={preferences.timezone}
                                options={timezones}
                                onChange={(e) => setPreferences({...preferences, timezone: e.value})}
                                className="w-full"
                            />
                        </div>
                    </div>
                </Card>

                {/* Date & Time */}
                <Card className="h-fit">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="text-green-600" size={20} />
                        <h3 className="text-lg font-semibold">Date & Time</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Format
                            </label>
                            <Dropdown
                                value={preferences.dateFormat}
                                options={dateFormats}
                                onChange={(e) => setPreferences({...preferences, dateFormat: e.value})}
                                className="w-full"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time Format
                            </label>
                            <Dropdown
                                value={preferences.timeFormat}
                                options={timeFormats}
                                onChange={(e) => setPreferences({...preferences, timeFormat: e.value})}
                                className="w-full"
                            />
                        </div>
                    </div>
                </Card>

                {/* Notifications */}
                <Card className="h-fit">
                    <div className="flex items-center gap-3 mb-4">
                        <Volume2 className="text-purple-600" size={20} />
                        <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Email Notifications
                            </label>
                            <InputSwitch
                                checked={preferences.emailNotifications}
                                onChange={(e) => setPreferences({...preferences, emailNotifications: e.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Push Notifications
                            </label>
                            <InputSwitch
                                checked={preferences.pushNotifications}
                                onChange={(e) => setPreferences({...preferences, pushNotifications: e.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Sound Effects
                            </label>
                            <InputSwitch
                                checked={preferences.soundEnabled}
                                onChange={(e) => setPreferences({...preferences, soundEnabled: e.value})}
                            />
                        </div>
                        
                        {preferences.soundEnabled && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sound Volume: {preferences.soundVolume}%
                                </label>
                                <Slider
                                    value={preferences.soundVolume}
                                    onChange={(e) => setPreferences({...preferences, soundVolume: e.value as number})}
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                </Card>

                {/* Display */}
                <Card className="h-fit">
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="text-orange-600" size={20} />
                        <h3 className="text-lg font-semibold">Display</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Dark Mode
                            </label>
                            <InputSwitch
                                checked={preferences.darkMode}
                                onChange={(e) => setPreferences({...preferences, darkMode: e.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Compact View
                            </label>
                            <InputSwitch
                                checked={preferences.compactView}
                                onChange={(e) => setPreferences({...preferences, compactView: e.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Show Avatars
                            </label>
                            <InputSwitch
                                checked={preferences.showAvatars}
                                onChange={(e) => setPreferences({...preferences, showAvatars: e.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Auto Save
                            </label>
                            <InputSwitch
                                checked={preferences.autoSave}
                                onChange={(e) => setPreferences({...preferences, autoSave: e.value})}
                            />
                        </div>
                        
                        {preferences.autoSave && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Auto Save Interval: {preferences.autoSaveInterval} minutes
                                </label>
                                <Slider
                                    value={preferences.autoSaveInterval}
                                    onChange={(e) => setPreferences({...preferences, autoSaveInterval: e.value as number})}
                                    min={1}
                                    max={30}
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8">
                <Button
                    label="Reset to Defaults"
                    className="p-button-outlined"
                    onClick={handleReset}
                />
                <Button
                    label="Save Preferences"
                    onClick={handleSave}
                />
            </div>
        </div>
    );
};

export default PreferencesPage;