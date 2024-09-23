<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        $user = Auth::user();
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();
        $totalInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();
        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();
        
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
    
        $myTasks = Task::query()
            ->whereIn('status', ['in_progress', 'pending'])
            ->where('assigned_user_id', $user->id)
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        $queryParams = request()->query() ?: null;
        $myTasks = TaskResource::collection($myTasks);
        $hideColumns = ['created_at', 'created_by'];
        return inertia('Dashboard', compact(
            'totalPendingTasks',
            'myPendingTasks', 
            'totalInProgressTasks',
            'myInProgressTasks', 
            'totalCompletedTasks',
            'myCompletedTasks', 
            'myTasks',
            'queryParams',
            'hideColumns'
        ));
    }
}
