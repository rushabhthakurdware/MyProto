import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
// --- Placeholder for the Header Component ---
// In a real application, this would be imported from a separate file: import Header from './Header';

// ---------------------------------------------


// --- 1. Main Content Components ---

// Component for the Campus Overview Page
const CampusOverview = ({ onAddNew }) => (
    <>
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-gray-200 mb-6">
            <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900">Campus Overview</h1>
                <p className="mt-1 text-gray-500">Welcome back, Admin. Here is an overview of your campus data.</p>
            </div>
            <button
                onClick={onAddNew}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
                <span className="flex items-center space-x-2">
                    <span data-lucide="plus"></span>
                    <span>Add New</span>
                </span>
            </button>
        </header>

        {/* Stats Section (Simplified for brevity) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Total Students</h3>
                    <span data-lucide="users" className="text-blue-500"></span>
                </div>
                <div className="mt-4 text-4xl font-bold text-gray-800">2,450</div>
                <p className="mt-1 text-sm text-gray-400">+12% from last semester</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Enrolled Courses</h3>
                    <span data-lucide="book-open" className="text-green-500"></span>
                </div>
                <div className="mt-4 text-4xl font-bold text-gray-800">189</div>
                <p className="mt-1 text-sm text-gray-400">+5 new this term</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Total Faculty</h3>
                    <span data-lucide="briefcase" className="text-purple-500"></span>
                </div>
                <div className="mt-4 text-4xl font-bold text-gray-800">78</div>
                <p className="mt-1 text-sm text-gray-400">On staff</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Active Logins</h3>
                    <span data-lucide="activity" className="text-yellow-500"></span>
                </div>
                <div className="mt-4 text-4xl font-bold text-gray-800">45</div>
                <p className="mt-1 text-sm text-gray-400">Live now</p>
            </div>
        </section>

        {/* Recent Students Table (Static data for display) */}
        <section className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Student Registrations</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 border-b border-gray-200">
                                <th className="py-2 px-4">Student Name</th>
                                <th className="py-2 px-4">Student ID</th>
                                <th className="py-2 px-4">Major</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 last:border-b-0">
                                <td className="py-3 px-4 text-gray-800">Jane Doe</td>
                                <td className="py-3 px-4 text-gray-600">S-1001</td>
                                <td className="py-3 px-4 text-gray-600">Computer Science</td>
                                <td className="py-3 px-4"><span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">Enrolled</span></td>
                            </tr>
                            <tr className="border-b border-gray-100 last:border-b-0">
                                <td className="py-3 px-4 text-gray-800">John Smith</td>
                                <td className="py-3 px-4 text-gray-600">S-1002</td>
                                <td className="py-3 px-4 text-gray-600">Biology</td>
                                <td className="py-3 px-4"><span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">Enrolled</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </>
);

const StudentsPage = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <header className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Student Management</h3>
            {/* Note: This button remains static but shows where a dedicated 'Add Student' button could go */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                <span className="flex items-center space-x-1">
                    <span data-lucide="plus" className="w-4 h-4"></span>
                    <span>Add Student</span>
                </span>
            </button>
        </header>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                        <th className="py-2 px-4">Student Name</th>
                        <th className="py-2 px-4">Student ID</th>
                        <th className="py-2 px-4">Major</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-100 last:border-b-0">
                        <td className="py-3 px-4 text-gray-800">Lisa Reynolds</td>
                        <td className="py-3 px-4 text-gray-600">S-1011</td>
                        <td className="py-3 px-4 text-gray-600">Physics</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">Enrolled</span></td>
                        <td className="py-3 px-4 flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-700" title="Edit">
                                <span data-lucide="pencil" className="w-5 h-5"></span>
                            </button>
                            <button className="text-red-500 hover:text-red-700" title="Delete">
                                <span data-lucide="trash-2" className="w-5 h-5"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const CoursesPage = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Course Catalog</h3>
        {/* ... table content for courses ... */}
    </div>
);

const FacultyPage = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Faculty Directory</h3>
        {/* ... table content for faculty ... */}
    </div>
);

const CampusNewsPage = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Announcements</h3>
        {/* ... announcement list content ... */}
    </div>
);

// --- 2. New Components for "Add New" Flow ---

// Component for the Add New Selection Menu
const AddNewSelection = ({ onSelect, onCancel }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg mx-auto min-h-[300px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What would you like to add?</h2>
        <div className="w-full space-y-4">
            <button
                onClick={() => onSelect('add-student')}
                className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl shadow transition-all transform hover:scale-[1.02] border border-blue-200"
            >
                <span className="flex items-center space-x-3 text-blue-700 font-semibold">
                    <span data-lucide="graduation-cap" className="w-6 h-6"></span>
                    <span>Enroll New Student</span>
                </span>
                <span data-lucide="arrow-right" className="w-5 h-5 text-blue-500"></span>
            </button>
            <button
                onClick={() => onSelect('add-company')}
                className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl shadow transition-all transform hover:scale-[1.02] border border-green-200"
            >
                <span className="flex items-center space-x-3 text-green-700 font-semibold">
                    <span data-lucide="building" className="w-6 h-6"></span>
                    <span>New Company/Campus Data</span>
                </span>
                <span data-lucide="arrow-right" className="w-5 h-5 text-green-500"></span>
            </button>
        </div>
        <button
            onClick={onCancel}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
            Cancel and return to Overview
        </button>
    </div>
);

// Component for the Add New Student Form (With Updated Success Alert)
const AddStudentForm = ({ onCancel }) => (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Enroll New Student 🎓</h2>
        <form className="space-y-4">
            {/* Form Fields */}
            <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="studentName" name="studentName" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Jane C. Doe"/>
            </div>
            <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700">Major/Program</label>
                <select id="major" name="major" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a Major</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Biology">Biology</option>
                </select>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="name@student.college.edu"/>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-xl font-semibold transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    // UPDATED ALERT MESSAGE
                    onClick={(e) => { e.preventDefault(); alert("Student Data Stored Successfully! 🎉"); onCancel(); }}
                    className="px-4 py-2 text-white bg-green-600 rounded-xl font-semibold shadow-md transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                    Submit Enrollment
                </button>
            </div>
        </form>
    </div>
);

// Component for the New Company/Campus Data Form (With Updated Success Alert)
const NewCompanyDataForm = ({ onCancel }) => (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">New Company/Campus Data 🏢</h2>
        <form className="space-y-4">
            {/* Form Fields */}
            <div>
                <label htmlFor="entityName" className="block text-sm font-medium text-gray-700">Company/Entity Name</label>
                <input type="text" id="entityName" name="entityName" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Acme Tech Solutions or New Cafeteria Vendor"/>
            </div>
            <div>
                <label htmlFor="dataType" className="block text-sm font-medium text-gray-700">Data Type</label>
                <select id="dataType" name="dataType" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Data Category</option>
                    <option value="Placement Partner">Placement Partner</option>
                    <option value="Vendor/Supplier">Vendor/Supplier</option>
                </select>
            </div>
            <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Key Details/Notes</label>
                <textarea id="details" name="details" rows="3" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Brief description of the partnership, vendor agreement, or campus data."></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-xl font-semibold transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    // UPDATED ALERT MESSAGE (to remove 'not saved')
                    onClick={(e) => { e.preventDefault(); alert("Company/Campus Data Stored Successfully! ✅"); onCancel(); }}
                    className="px-4 py-2 text-white bg-green-600 rounded-xl font-semibold shadow-md transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                    Save Data
                </button>
            </div>
        </form>
    </div>
);

// --- 3. Main Admin Component ---

function Admin() {
    // State to manage the active view/page
    const [activeComponent, setActiveComponent] = useState('overview');
    const navigate = useNavigate(); // For the logout function

    // useEffect to run Lucide icons after state change
    useEffect(() => {
        // This is necessary if you're using a local script for lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [activeComponent]);

    const renderContent = () => {
        const backToOverview = () => setActiveComponent('overview');

        switch (activeComponent) {
            case 'overview':
                return <CampusOverview onAddNew={() => setActiveComponent('add-new-selection')} />;
            case 'add-new-selection':
                return <AddNewSelection 
                            onSelect={setActiveComponent}
                            onCancel={backToOverview} 
                        />;
            case 'students':
                return <StudentsPage />;
            case 'courses':
                return <CoursesPage />;
            case 'faculty':
                return <FacultyPage />;
            case 'news':
                return <CampusNewsPage />;
            case 'add-student':
                return <AddStudentForm onCancel={backToOverview} />;
            case 'add-company':
                return <NewCompanyDataForm onCancel={backToOverview} />;
            default:
                return <CampusOverview onAddNew={() => setActiveComponent('add-new-selection')} />;
        }
    };

    const getSidebarItemClasses = (componentName) => {
        const baseClasses = "flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-200 cursor-pointer";
        // Highlight 'Students' if activeComponent is 'students' OR 'add-student'
        const isActive = activeComponent === componentName || (componentName === 'students' && activeComponent === 'add-student');
        const activeClasses = "text-gray-700 bg-gray-100 font-semibold";
        const inactiveClasses = "text-gray-500 hover:text-gray-700";
        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    const handleLogout = () => {
        // Placeholder for real logout logic
        navigate("/", { replace: true });
    };

    return (
        <>
            <Header userName="Ravi" department="cse" />
            <div className="flex min-h-screen font-inter pt-20"> {/* Added pt-20 to clear fixed header */}
                {/* Sidebar */}
                <aside className="w-64 bg-white p-4 flex flex-col items-center shadow-lg rounded-r-2xl h-screen sticky top-20"> {/* Changed top-0 to top-20 */}
                    <div className="text-2xl font-bold text-gray-800 mb-8 mt-2">
                        College Admin
                    </div>
                    <nav className="w-full space-y-2">
                        <div onClick={() => setActiveComponent('overview')} className={getSidebarItemClasses('overview')}>
                            <span data-lucide="layout-dashboard"></span>
                            <span>Campus Overview</span>
                        </div>
                        <div onClick={() => setActiveComponent('students')} className={getSidebarItemClasses('students')}>
                            <span data-lucide="graduation-cap"></span>
                            <span>Students</span>
                        </div>
                        <div onClick={() => setActiveComponent('courses')} className={getSidebarItemClasses('courses')}>
                            <span data-lucide="book"></span>
                            <span>Courses</span>
                        </div>
                        <div onClick={() => setActiveComponent('faculty')} className={getSidebarItemClasses('faculty')}>
                            <span data-lucide="briefcase"></span>
                            <span>Faculty</span>
                        </div>
                        <div onClick={() => setActiveComponent('news')} className={getSidebarItemClasses('news')}>
                            <span data-lucide="bell"></span>
                            <span>Campus News</span>
                        </div>
                    </nav>
                    <div className="mt-auto w-full">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold w-full transition-colors hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            title="Logout"
                        >
                            <span data-lucide="log-out"></span>
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </>
    );
}

export default Admin;